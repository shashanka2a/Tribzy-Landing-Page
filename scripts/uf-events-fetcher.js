#!/usr/bin/env node
"use strict";
/**
 * UF Gainesville Events Fetcher
 * Fetches events happening at University of Florida in Gainesville, FL
 * Starting from October 27, 2025
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UFEventsFetcher = void 0;
var fs_1 = require("fs");
// Configuration
var TARGET_DATE = new Date('2025-10-27');
var GAINESVILLE_KEYWORDS = [
    'gainesville', 'uf', 'university of florida', 'gator', 'campus',
    'turlington', 'reitz union', 'swamp', 'ben hill griffin'
];
// Event sources for UF Gainesville
var EVENT_SOURCES = [
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
var MOCK_UF_EVENTS = [
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
function parseUFCalendar(html) {
    // In a real implementation, this would parse the actual HTML
    return MOCK_UF_EVENTS.filter(function (event) { return event.source === 'UF Events Calendar'; });
}
function parseStudentActivities(html) {
    return MOCK_UF_EVENTS.filter(function (event) { return event.source === 'UF Student Activities'; });
}
function parseAthletics(html) {
    return MOCK_UF_EVENTS.filter(function (event) { return event.source === 'UF Athletics'; });
}
function parseGainesvilleEvents(html) {
    return MOCK_UF_EVENTS.filter(function (event) { return event.source === 'Gainesville Events'; });
}
// Main fetcher class
var UFEventsFetcher = /** @class */ (function () {
    function UFEventsFetcher() {
        this.events = [];
    }
    UFEventsFetcher.prototype.fetchAllEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('🚀 Starting UF Gainesville events fetch...');
                console.log("\uD83D\uDCC5 Target date: ".concat(TARGET_DATE.toLocaleDateString()));
                console.log('📍 Location: Gainesville, FL (University of Florida)');
                console.log('');
                // In a real implementation, we would fetch from actual sources
                // For now, we'll use mock data that represents realistic UF events
                this.events = MOCK_UF_EVENTS.filter(function (event) {
                    var eventDate = new Date(event.date);
                    return eventDate >= TARGET_DATE;
                });
                console.log("\u2705 Found ".concat(this.events.length, " events starting from ").concat(TARGET_DATE.toLocaleDateString()));
                return [2 /*return*/, this.events];
            });
        });
    };
    UFEventsFetcher.prototype.fetchFromSource = function (source) {
        return __awaiter(this, void 0, void 0, function () {
            var mockEvents;
            return __generator(this, function (_a) {
                try {
                    console.log("\uD83D\uDD0D Fetching from ".concat(source.name, "..."));
                    mockEvents = source.parser('<mock-html>');
                    console.log("   Found ".concat(mockEvents.length, " events"));
                    return [2 /*return*/, mockEvents];
                }
                catch (error) {
                    console.error("\u274C Error fetching from ".concat(source.name, ":"), error);
                    return [2 /*return*/, []];
                }
                return [2 /*return*/];
            });
        });
    };
    UFEventsFetcher.prototype.filterByDate = function (events, startDate) {
        return events.filter(function (event) {
            var eventDate = new Date(event.date);
            return eventDate >= startDate;
        });
    };
    UFEventsFetcher.prototype.filterByLocation = function (events, keywords) {
        return events.filter(function (event) {
            var searchText = "".concat(event.title, " ").concat(event.description, " ").concat(event.location).toLowerCase();
            return keywords.some(function (keyword) { return searchText.includes(keyword.toLowerCase()); });
        });
    };
    UFEventsFetcher.prototype.sortEvents = function (events) {
        return events.sort(function (a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        });
    };
    UFEventsFetcher.prototype.generateReport = function (events) {
        var report = "\n# UF Gainesville Events Report\nGenerated: ".concat(new Date().toLocaleString(), "\nTarget Date: ").concat(TARGET_DATE.toLocaleDateString(), "\nTotal Events: ").concat(events.length, "\n\n## Event Summary by Category\n").concat(this.getCategorySummary(events), "\n\n## Upcoming Events\n").concat(this.getEventList(events), "\n\n## Event Sources\n").concat(this.getSourceSummary(events), "\n");
        return report;
    };
    UFEventsFetcher.prototype.getCategorySummary = function (events) {
        var categories = events.reduce(function (acc, event) {
            acc[event.category] = (acc[event.category] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(categories)
            .map(function (_a) {
            var category = _a[0], count = _a[1];
            return "- **".concat(category, "**: ").concat(count, " events");
        })
            .join('\n');
    };
    UFEventsFetcher.prototype.getEventList = function (events) {
        return events.map(function (event) { return "\n### ".concat(event.title, "\n- **Date**: ").concat(event.date, " at ").concat(event.time, "\n- **Location**: ").concat(event.location, "\n- **Category**: ").concat(event.category, "\n- **Organizer**: ").concat(event.organizer, "\n- **Price**: ").concat(event.price, "\n- **Description**: ").concat(event.description, "\n- **Source**: ").concat(event.source, "\n- **URL**: ").concat(event.url, "\n"); }).join('\n');
    };
    UFEventsFetcher.prototype.getSourceSummary = function (events) {
        var sources = events.reduce(function (acc, event) {
            acc[event.source] = (acc[event.source] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(sources)
            .map(function (_a) {
            var source = _a[0], count = _a[1];
            return "- **".concat(source, "**: ").concat(count, " events");
        })
            .join('\n');
    };
    UFEventsFetcher.prototype.saveToFile = function (events_1) {
        return __awaiter(this, arguments, void 0, function (events, filename) {
            var data;
            if (filename === void 0) { filename = 'uf-events.json'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            generated: new Date().toISOString(),
                            targetDate: TARGET_DATE.toISOString(),
                            totalEvents: events.length,
                            events: events
                        };
                        return [4 /*yield*/, fs_1.default.promises.writeFile(filename, JSON.stringify(data, null, 2))];
                    case 1:
                        _a.sent();
                        console.log("\uD83D\uDCBE Events saved to ".concat(filename));
                        return [2 /*return*/];
                }
            });
        });
    };
    UFEventsFetcher.prototype.saveReportToFile = function (events_1) {
        return __awaiter(this, arguments, void 0, function (events, filename) {
            var report;
            if (filename === void 0) { filename = 'uf-events-report.md'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        report = this.generateReport(events);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(filename, report)];
                    case 1:
                        _a.sent();
                        console.log("\uD83D\uDCC4 Report saved to ".concat(filename));
                        return [2 /*return*/];
                }
            });
        });
    };
    return UFEventsFetcher;
}());
exports.UFEventsFetcher = UFEventsFetcher;
// CLI interface
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var fetcher, events, filteredEvents, sortedEvents, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetcher = new UFEventsFetcher();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetcher.fetchAllEvents()];
                case 2:
                    events = _a.sent();
                    filteredEvents = fetcher.filterByLocation(events, GAINESVILLE_KEYWORDS);
                    sortedEvents = fetcher.sortEvents(filteredEvents);
                    // Display results
                    console.log('\n📋 Event List:');
                    console.log('='.repeat(80));
                    sortedEvents.forEach(function (event, index) {
                        console.log("\n".concat(index + 1, ". ").concat(event.title));
                        console.log("   \uD83D\uDCC5 ".concat(event.date, " at ").concat(event.time));
                        console.log("   \uD83D\uDCCD ".concat(event.location));
                        console.log("   \uD83C\uDFF7\uFE0F  ".concat(event.category));
                        console.log("   \uD83D\uDC64 ".concat(event.organizer));
                        console.log("   \uD83D\uDCB0 ".concat(event.price));
                        console.log("   \uD83D\uDCDD ".concat(event.description.substring(0, 100), "..."));
                        console.log("   \uD83D\uDD17 ".concat(event.url));
                        console.log("   \uD83D\uDCCA Source: ".concat(event.source));
                    });
                    // Generate and save files
                    return [4 /*yield*/, fetcher.saveToFile(sortedEvents)];
                case 3:
                    // Generate and save files
                    _a.sent();
                    return [4 /*yield*/, fetcher.saveReportToFile(sortedEvents)];
                case 4:
                    _a.sent();
                    console.log('\n✅ UF Gainesville events fetch completed!');
                    console.log("\uD83D\uDCCA Total events found: ".concat(sortedEvents.length));
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error('❌ Error fetching events:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Run if called directly
if (require.main === module) {
    main();
}
