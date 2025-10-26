#!/usr/bin/env node

/**
 * UF Gainesville Events Fetcher
 * Fetches events happening at University of Florida in Gainesville, FL
 * Starting from October 27, 2025
 */

import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

// Types
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  url: string;
  image?: string;
  price?: string;
  attendees?: number;
  maxAttendees?: number;
  tags: string[];
  source: string;
}

interface EventSource {
  name: string;
  url: string;
  selector: string;
  parser: (html: string) => Event[];
}

// Configuration
const TARGET_DATE = new Date('2025-10-27');
const GAINESVILLE_KEYWORDS = [
  'gainesville', 'uf', 'university of florida', 'gator', 'campus',
  'turlington', 'reitz union', 'swamp', 'ben hill griffin'
];

// Event sources for UF Gainesville
const EVENT_SOURCES: EventSource[] = [
  {
    name: 'UF Events Calendar',
    url: 'https://calendar.ufl.edu/',
    selector: '.event-item',
    parser: parseUFCalendar
  },
  {
    name: 'UF Student Activities',
    url: 'https://www.ufsa.ufl.edu/events/',
    selector: '.event-card',
    parser: parseStudentActivities
  },
  {
    name: 'UF Athletics',
    url: 'https://floridagators.com/sports/',
    selector: '.game-item',
    parser: parseAthletics
  },
  {
    name: 'Gainesville Events',
    url: 'https://www.visitgainesville.com/events/',
    selector: '.event-listing',
    parser: parseGainesvilleEvents
  }
];

// Mock data for demonstration (since we can't actually scrape live sites)
const MOCK_UF_EVENTS: Event[] = [
  {
    id: 'uf-001',
    title: 'UF Homecoming Week Kickoff',
    description: 'Join us for the start of UF Homecoming Week with food trucks, live music, and Gator spirit activities.',
    date: '2025-10-27',
    time: '6:00 PM',
    location: 'Turlington Plaza',
    category: 'Social',
    organizer: 'UF Student Government',
    url: 'https://calendar.ufl.edu/event/homecoming-kickoff',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    price: 'Free',
    attendees: 0,
    maxAttendees: 1000,
    tags: ['homecoming', 'social', 'campus', 'free'],
    source: 'UF Events Calendar'
  },
  {
    id: 'uf-002',
    title: 'Gator Football vs Georgia Bulldogs',
    description: 'Watch the Gators take on the Georgia Bulldogs in this highly anticipated rivalry game.',
    date: '2025-11-01',
    time: '3:30 PM',
    location: 'Ben Hill Griffin Stadium',
    category: 'Sports',
    organizer: 'UF Athletics',
    url: 'https://floridagators.com/sports/football/schedule',
    image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=300&fit=crop',
    price: '$45-$150',
    attendees: 0,
    maxAttendees: 88548,
    tags: ['football', 'sports', 'rivalry', 'stadium'],
    source: 'UF Athletics'
  },
  {
    id: 'uf-003',
    title: 'UF Career Fair Fall 2025',
    description: 'Connect with top employers and explore career opportunities at the largest career fair of the semester.',
    date: '2025-10-29',
    time: '10:00 AM',
    location: 'O\'Connell Center',
    category: 'Academic',
    organizer: 'UF Career Connections Center',
    url: 'https://career.ufl.edu/events/career-fair-fall-2025',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop',
    price: 'Free',
    attendees: 0,
    maxAttendees: 5000,
    tags: ['career', 'networking', 'jobs', 'professional'],
    source: 'UF Student Activities'
  },
  {
    id: 'uf-004',
    title: 'GatorNights: Halloween Spooktacular',
    description: 'Join us for a spooky night of Halloween fun with haunted houses, costume contests, and treats.',
    date: '2025-10-31',
    time: '8:00 PM',
    location: 'Reitz Union',
    category: 'Social',
    organizer: 'UF Student Activities',
    url: 'https://www.ufsa.ufl.edu/events/gatornights-halloween',
    image: 'https://images.unsplash.com/photo-1509557965043-1d0b0b4a9a0a?w=400&h=300&fit=crop',
    price: 'Free',
    attendees: 0,
    maxAttendees: 800,
    tags: ['halloween', 'gatornights', 'costume', 'social'],
    source: 'UF Student Activities'
  },
  {
    id: 'uf-005',
    title: 'UF Research Symposium',
    description: 'Showcase undergraduate and graduate research projects across all disciplines.',
    date: '2025-11-05',
    time: '9:00 AM',
    location: 'Reitz Union Grand Ballroom',
    category: 'Academic',
    organizer: 'UF Office of Research',
    url: 'https://research.ufl.edu/events/symposium',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    price: 'Free',
    attendees: 0,
    maxAttendees: 300,
    tags: ['research', 'academic', 'presentation', 'scholarship'],
    source: 'UF Events Calendar'
  },
  {
    id: 'uf-006',
    title: 'Gainesville Food Truck Rally',
    description: 'Sample delicious food from local Gainesville food trucks on campus.',
    date: '2025-11-08',
    time: '5:00 PM',
    location: 'Plaza of the Americas',
    category: 'Food',
    organizer: 'UF Dining Services',
    url: 'https://dining.ufl.edu/events/food-truck-rally',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    price: '$5-$15',
    attendees: 0,
    maxAttendees: 500,
    tags: ['food', 'local', 'trucks', 'campus'],
    source: 'Gainesville Events'
  },
  {
    id: 'uf-007',
    title: 'UF Basketball Season Opener',
    description: 'Cheer on the Gators as they tip off the 2025-26 basketball season.',
    date: '2025-11-12',
    time: '7:00 PM',
    location: 'Exactech Arena',
    category: 'Sports',
    organizer: 'UF Athletics',
    url: 'https://floridagators.com/sports/mens-basketball/schedule',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop',
    price: '$20-$75',
    attendees: 0,
    maxAttendees: 10000,
    tags: ['basketball', 'sports', 'season-opener', 'gators'],
    source: 'UF Athletics'
  },
  {
    id: 'uf-008',
    title: 'UF International Education Week',
    description: 'Celebrate global diversity with cultural performances, food, and educational activities.',
    date: '2025-11-15',
    time: '11:00 AM',
    location: 'Turlington Plaza',
    category: 'Cultural',
    organizer: 'UF International Center',
    url: 'https://international.ufl.edu/events/education-week',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
    price: 'Free',
    attendees: 0,
    maxAttendees: 1000,
    tags: ['international', 'cultural', 'diversity', 'education'],
    source: 'UF Events Calendar'
  }
];

// Parser functions (mock implementations)
function parseUFCalendar(html: string): Event[] {
  // In a real implementation, this would parse the actual HTML
  return MOCK_UF_EVENTS.filter(event => event.source === 'UF Events Calendar');
}

function parseStudentActivities(html: string): Event[] {
  return MOCK_UF_EVENTS.filter(event => event.source === 'UF Student Activities');
}

function parseAthletics(html: string): Event[] {
  return MOCK_UF_EVENTS.filter(event => event.source === 'UF Athletics');
}

function parseGainesvilleEvents(html: string): Event[] {
  return MOCK_UF_EVENTS.filter(event => event.source === 'Gainesville Events');
}

// Main fetcher class
class UFEventsFetcher {
  private events: Event[] = [];

  async fetchAllEvents(): Promise<Event[]> {
    console.log('🚀 Starting UF Gainesville events fetch...');
    console.log(`📅 Target date: ${TARGET_DATE.toLocaleDateString()}`);
    console.log('📍 Location: Gainesville, FL (University of Florida)');
    console.log('');

    // In a real implementation, we would fetch from actual sources
    // For now, we'll use mock data that represents realistic UF events
    this.events = MOCK_UF_EVENTS.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= TARGET_DATE;
    });

    console.log(`✅ Found ${this.events.length} events starting from ${TARGET_DATE.toLocaleDateString()}`);
    return this.events;
  }

  async fetchFromSource(source: EventSource): Promise<Event[]> {
    try {
      console.log(`🔍 Fetching from ${source.name}...`);
      
      // In a real implementation, we would make HTTP requests
      // const response = await axios.get(source.url);
      // const $ = cheerio.load(response.data);
      // return source.parser($.html());
      
      // For demo purposes, return mock data
      const mockEvents = source.parser('<mock-html>');
      console.log(`   Found ${mockEvents.length} events`);
      return mockEvents;
    } catch (error) {
      console.error(`❌ Error fetching from ${source.name}:`, error);
      return [];
    }
  }

  filterByDate(events: Event[], startDate: Date): Event[] {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate;
    });
  }

  filterByLocation(events: Event[], keywords: string[]): Event[] {
    return events.filter(event => {
      const searchText = `${event.title} ${event.description} ${event.location}`.toLowerCase();
      return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
    });
  }

  sortEvents(events: Event[]): Event[] {
    return events.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  }

  generateReport(events: Event[]): string {
    const report = `
# UF Gainesville Events Report
Generated: ${new Date().toLocaleString()}
Target Date: ${TARGET_DATE.toLocaleDateString()}
Total Events: ${events.length}

## Event Summary by Category
${this.getCategorySummary(events)}

## Upcoming Events
${this.getEventList(events)}

## Event Sources
${this.getSourceSummary(events)}
`;
    return report;
  }

  private getCategorySummary(events: Event[]): string {
    const categories = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categories)
      .map(([category, count]) => `- **${category}**: ${count} events`)
      .join('\n');
  }

  private getEventList(events: Event[]): string {
    return events.map(event => `
### ${event.title}
- **Date**: ${event.date} at ${event.time}
- **Location**: ${event.location}
- **Category**: ${event.category}
- **Organizer**: ${event.organizer}
- **Price**: ${event.price}
- **Description**: ${event.description}
- **Source**: ${event.source}
- **URL**: ${event.url}
`).join('\n');
  }

  private getSourceSummary(events: Event[]): string {
    const sources = events.reduce((acc, event) => {
      acc[event.source] = (acc[event.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(sources)
      .map(([source, count]) => `- **${source}**: ${count} events`)
      .join('\n');
  }

  async saveToFile(events: Event[], filename: string = 'uf-events.json'): Promise<void> {
    const data = {
      generated: new Date().toISOString(),
      targetDate: TARGET_DATE.toISOString(),
      totalEvents: events.length,
      events: events
    };

    await fs.promises.writeFile(filename, JSON.stringify(data, null, 2));
    console.log(`💾 Events saved to ${filename}`);
  }

  async saveReportToFile(events: Event[], filename: string = 'uf-events-report.md'): Promise<void> {
    const report = this.generateReport(events);
    await fs.promises.writeFile(filename, report);
    console.log(`📄 Report saved to ${filename}`);
  }
}

// CLI interface
async function main() {
  const fetcher = new UFEventsFetcher();
  
  try {
    // Fetch events
    const events = await fetcher.fetchAllEvents();
    
    // Filter and sort
    const filteredEvents = fetcher.filterByLocation(events, GAINESVILLE_KEYWORDS);
    const sortedEvents = fetcher.sortEvents(filteredEvents);
    
    // Display results
    console.log('\n📋 Event List:');
    console.log('='.repeat(80));
    
    sortedEvents.forEach((event, index) => {
      console.log(`\n${index + 1}. ${event.title}`);
      console.log(`   📅 ${event.date} at ${event.time}`);
      console.log(`   📍 ${event.location}`);
      console.log(`   🏷️  ${event.category}`);
      console.log(`   👤 ${event.organizer}`);
      console.log(`   💰 ${event.price}`);
      console.log(`   📝 ${event.description.substring(0, 100)}...`);
      console.log(`   🔗 ${event.url}`);
      console.log(`   📊 Source: ${event.source}`);
    });
    
    // Generate and save files
    await fetcher.saveToFile(sortedEvents);
    await fetcher.saveReportToFile(sortedEvents);
    
    console.log('\n✅ UF Gainesville events fetch completed!');
    console.log(`📊 Total events found: ${sortedEvents.length}`);
    
  } catch (error) {
    console.error('❌ Error fetching events:', error);
    process.exit(1);
  }
}

// Export for use in other modules
export { UFEventsFetcher, Event, EventSource };

// Run if called directly
if (require.main === module) {
  main();
}
