# UF Gainesville Events Fetcher

A script to fetch and display events happening at University of Florida in Gainesville, FL, starting from October 27, 2025.

## 🎯 Purpose

This script helps you discover upcoming events at UF Gainesville, including:
- **Academic Events** (Career fairs, research symposiums, engineering expos)
- **Sports Events** (Football, basketball, volleyball games)
- **Social Events** (Homecoming, GatorNights, cultural celebrations)
- **Campus Activities** (Food truck rallies, international education week)

## 🚀 Quick Start

### Option 1: Run JavaScript Version (No Dependencies)
```bash
cd scripts
node uf-events-fetcher.js
```

### Option 2: Run TypeScript Version (Requires Dependencies)
```bash
cd scripts
npm install
npm run fetch-events
```

## 📋 Sample Output

The script will display events in both table and detailed formats:

```
📋 UF Gainesville Events Table:
========================================================================================================================
| # | Event Title | Date | Time | Location | Category | Price |
|------------------------------------------------------------------------------------------------------------------------
| 1 | UF Homecoming Week Kickoff | 2025-10-27 | 6:00 PM | Turlington Plaza | Social | Free |
| 2 | UF Career Fair Fall 2025 | 2025-10-29 | 10:00 AM | O'Connell Center | Academic | Free |
| 3 | GatorNights: Halloween Spooktacular | 2025-10-31 | 8:00 PM | Reitz Union | Social | Free |
| 4 | Gator Football vs Georgia Bulldogs | 2025-11-01 | 3:30 PM | Ben Hill Griffin Stadium | Sports | $45-$150 |
```

## 📁 Generated Files

The script creates two output files:

### 1. `uf-events.json`
```json
{
  "generated": "2024-01-15T10:30:00.000Z",
  "targetDate": "2025-10-27T00:00:00.000Z",
  "totalEvents": 10,
  "events": [
    {
      "id": "uf-001",
      "title": "UF Homecoming Week Kickoff",
      "description": "Join us for the start of UF Homecoming Week...",
      "date": "2025-10-27",
      "time": "6:00 PM",
      "location": "Turlington Plaza",
      "category": "Social",
      "organizer": "UF Student Government",
      "url": "https://calendar.ufl.edu/event/homecoming-kickoff",
      "price": "Free",
      "tags": ["homecoming", "social", "campus", "free"],
      "source": "UF Events Calendar"
    }
  ]
}
```

### 2. `uf-events-report.md`
A comprehensive markdown report with:
- Event summaries by category
- Detailed event listings
- Source attribution
- Statistics and analytics

## 🏗️ Architecture

### Event Sources
The script is designed to fetch from multiple UF sources:
- **UF Events Calendar** (calendar.ufl.edu)
- **UF Student Activities** (ufsa.ufl.edu)
- **UF Athletics** (floridagators.com)
- **Gainesville Events** (visitgainesville.com)

### Data Structure
Each event includes:
```javascript
{
  id: string,           // Unique identifier
  title: string,        // Event name
  description: string,  // Event details
  date: string,         // YYYY-MM-DD format
  time: string,         // Time in 12-hour format
  location: string,     // Venue/address
  category: string,     // Event type
  organizer: string,    // Host organization
  url: string,          // Event page URL
  image?: string,       // Event image URL
  price: string,        // Cost information
  attendees: number,    // Current attendees
  maxAttendees: number, // Capacity limit
  tags: string[],       // Searchable tags
  source: string        // Data source
}
```

## 🔧 Customization

### Modify Target Date
```javascript
const TARGET_DATE = new Date('2025-10-27'); // Change this date
```

### Add New Keywords
```javascript
const GAINESVILLE_KEYWORDS = [
  'gainesville', 'uf', 'university of florida', 'gator', 'campus',
  'turlington', 'reitz union', 'swamp', 'ben hill griffin',
  'your-new-keyword' // Add custom keywords
];
```

### Add New Event Sources
```javascript
const EVENT_SOURCES = [
  // ... existing sources
  {
    name: 'Your New Source',
    url: 'https://your-source.com/events',
    selector: '.event-item',
    parser: parseYourSource
  }
];
```

## 📊 Event Categories

The script categorizes events into:
- **Academic** - Career fairs, research symposiums, academic conferences
- **Sports** - Football, basketball, volleyball, and other athletic events
- **Social** - Homecoming, parties, social gatherings
- **Cultural** - International events, diversity celebrations
- **Food** - Food truck rallies, dining events
- **Other** - Miscellaneous campus activities

## 🎯 Key Features

### Smart Filtering
- **Date filtering** - Only events from target date onwards
- **Location filtering** - Gainesville/UF specific events
- **Keyword matching** - Campus-specific terminology

### Data Export
- **JSON format** - Machine-readable data
- **Markdown report** - Human-readable summary
- **Table display** - Console-friendly format

### Error Handling
- **Graceful failures** - Continues if one source fails
- **Validation** - Ensures data integrity
- **Logging** - Clear progress and error messages

## 🔮 Future Enhancements

### Real API Integration
```javascript
// Replace mock data with real API calls
async function fetchRealEvents(source) {
  const response = await axios.get(source.url);
  const $ = cheerio.load(response.data);
  return source.parser($.html());
}
```

### Additional Features
- **Real-time updates** - Live event data
- **Email notifications** - Event alerts
- **Calendar integration** - Add to personal calendar
- **Social sharing** - Share events on social media
- **Event recommendations** - Based on interests
- **RSVP tracking** - Event attendance management

## 🛠️ Development

### Prerequisites
- Node.js 14+ (for TypeScript version)
- npm or yarn

### Setup
```bash
cd scripts
npm install
```

### Run Tests
```bash
npm test
```

### Build
```bash
npm run build
```

## 📝 Notes

### Current Implementation
This script currently uses **mock data** to demonstrate the functionality. In a production environment, you would:

1. **Replace mock data** with real API calls
2. **Add authentication** for protected sources
3. **Implement rate limiting** to respect API limits
4. **Add caching** to reduce API calls
5. **Handle pagination** for large event lists

### Data Sources
The script is designed to work with:
- **UF official calendars** - Primary source
- **Student organization sites** - Secondary source
- **Athletic department** - Sports events
- **Local Gainesville events** - Community activities

### Legal Considerations
- **Respect robots.txt** - Follow website crawling policies
- **Rate limiting** - Don't overwhelm servers
- **Terms of service** - Comply with platform rules
- **Data attribution** - Credit original sources

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your improvements
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - Feel free to use and modify for your needs.

---

**Happy event hunting at UF Gainesville! 🐊**
