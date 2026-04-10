export type Genre =
  | "Bollywood"
  | "Hollywood"
  | "Punjabi"
  | "Rock"
  | "Lofi"
  | "HipHop"
  | "EDM"
  | "Classical"
  | "Romantic"
  | "Sufi"
  | "Ghazal"
  | "Devotional"
  | "KPop"
  | "Latin"
  | "Jazz"
  | "Metal";

export type Mood = "happy" | "sad" | "energetic" | "calm" | "romantic" | "spiritual" | "intense";

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: Genre;
  mood: Mood;
  popularity: number;
  year: number;
  audioUrl?: string;
  color: string;
  size: number;
}

const genreColors: Record<Genre, string> = {
  Bollywood: "#ff6b35",
  Hollywood: "#4ecdc4",
  Punjabi: "#ff9500",
  Rock: "#e74c3c",
  Lofi: "#9b59b6",
  HipHop: "#f39c12",
  EDM: "#00d2ff",
  Classical: "#f8f0e3",
  Romantic: "#ff69b4",
  Sufi: "#c0392b",
  Ghazal: "#8e44ad",
  Devotional: "#f1c40f",
  KPop: "#fd79a8",
  Latin: "#00b894",
  Jazz: "#6c5ce7",
  Metal: "#636e72",
};

export function getSongColor(genre: Genre, mood: Mood): string {
  const base = genreColors[genre];
  const moodTints: Record<Mood, string> = {
    happy: "#fff",
    sad: "#333",
    energetic: "#ff0",
    calm: "#aaa",
    romantic: "#ff6",
    spiritual: "#daf",
    intense: "#f00",
  };
  void moodTints;
  return base;
}

export const SONGS: Song[] = [
  { id: "1", title: "Tum Hi Ho", artist: "Arijit Singh", genre: "Bollywood", mood: "romantic", popularity: 98, year: 2013, color: "#ff6b35", size: 1.8 },
  { id: "2", title: "Kesariya", artist: "Arijit Singh", genre: "Bollywood", mood: "romantic", popularity: 96, year: 2022, color: "#ff7b45", size: 1.7 },
  { id: "3", title: "Chahun Main Ya Naa", artist: "Arijit Singh", genre: "Bollywood", mood: "romantic", popularity: 88, year: 2014, color: "#ff5925", size: 1.5 },
  { id: "4", title: "Tera Ban Jaunga", artist: "Akhil Sachdeva", genre: "Bollywood", mood: "sad", popularity: 85, year: 2019, color: "#e05020", size: 1.4 },
  { id: "5", title: "Dil Diyan Gallan", artist: "Atif Aslam", genre: "Bollywood", mood: "romantic", popularity: 90, year: 2017, color: "#ff8040", size: 1.5 },
  { id: "6", title: "Raataan Lambiyan", artist: "Jubin Nautiyal", genre: "Bollywood", mood: "romantic", popularity: 93, year: 2021, color: "#ff6030", size: 1.6 },
  { id: "7", title: "Jeena Jeena", artist: "Atif Aslam", genre: "Bollywood", mood: "happy", popularity: 87, year: 2014, color: "#ff7050", size: 1.4 },
  { id: "8", title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", genre: "Bollywood", mood: "sad", popularity: 94, year: 2016, color: "#e04020", size: 1.6 },
  { id: "9", title: "Channa Mereya", artist: "Arijit Singh", genre: "Bollywood", mood: "sad", popularity: 96, year: 2016, color: "#ff5035", size: 1.7 },
  { id: "10", title: "Ik Vaari Aa", artist: "Arijit Singh", genre: "Bollywood", mood: "romantic", popularity: 88, year: 2016, color: "#ff6040", size: 1.5 },

  { id: "11", title: "Blinding Lights", artist: "The Weeknd", genre: "Hollywood", mood: "energetic", popularity: 99, year: 2019, color: "#4ecdc4", size: 1.9 },
  { id: "12", title: "Shape of You", artist: "Ed Sheeran", genre: "Hollywood", mood: "happy", popularity: 98, year: 2017, color: "#3ebdb4", size: 1.8 },
  { id: "13", title: "Stay", artist: "The Kid LAROI", genre: "Hollywood", mood: "sad", popularity: 92, year: 2021, color: "#5ed2d0", size: 1.5 },
  { id: "14", title: "Levitating", artist: "Dua Lipa", genre: "Hollywood", mood: "happy", popularity: 90, year: 2020, color: "#4ecdc4", size: 1.5 },
  { id: "15", title: "Watermelon Sugar", artist: "Harry Styles", genre: "Hollywood", mood: "happy", popularity: 88, year: 2019, color: "#6edcda", size: 1.4 },
  { id: "16", title: "Bad Guy", artist: "Billie Eilish", genre: "Hollywood", mood: "intense", popularity: 96, year: 2019, color: "#2ebcb4", size: 1.7 },
  { id: "17", title: "Dynamite", artist: "BTS", genre: "Hollywood", mood: "happy", popularity: 94, year: 2020, color: "#5ecdc4", size: 1.6 },

  { id: "18", title: "Lahore", artist: "Guru Randhawa", genre: "Punjabi", mood: "happy", popularity: 90, year: 2017, color: "#ff9500", size: 1.5 },
  { id: "19", title: "High Rated Gabru", artist: "Guru Randhawa", genre: "Punjabi", mood: "energetic", popularity: 88, year: 2018, color: "#ffaa20", size: 1.4 },
  { id: "20", title: "Proper Patola", artist: "Diljit Dosanjh", genre: "Punjabi", mood: "happy", popularity: 85, year: 2018, color: "#ff9510", size: 1.3 },
  { id: "21", title: "Ikk Kudi", artist: "Diljit Dosanjh", genre: "Punjabi", mood: "calm", popularity: 87, year: 2016, color: "#ffb030", size: 1.4 },
  { id: "22", title: "G.O.A.T.", artist: "Diljit Dosanjh", genre: "Punjabi", mood: "energetic", popularity: 89, year: 2020, color: "#ff9000", size: 1.5 },
  { id: "23", title: "Lover", artist: "Diljit Dosanjh", genre: "Punjabi", mood: "romantic", popularity: 86, year: 2021, color: "#ffa020", size: 1.4 },

  { id: "24", title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock", mood: "intense", popularity: 99, year: 1975, color: "#e74c3c", size: 1.9 },
  { id: "25", title: "Hotel California", artist: "Eagles", genre: "Rock", mood: "calm", popularity: 97, year: 1977, color: "#c0392b", size: 1.7 },
  { id: "26", title: "Stairway to Heaven", artist: "Led Zeppelin", genre: "Rock", mood: "intense", popularity: 96, year: 1971, color: "#d44030", size: 1.7 },
  { id: "27", title: "Sweet Child O' Mine", artist: "Guns N' Roses", genre: "Rock", mood: "energetic", popularity: 95, year: 1987, color: "#e03020", size: 1.6 },
  { id: "28", title: "Smells Like Teen Spirit", artist: "Nirvana", genre: "Rock", mood: "intense", popularity: 97, year: 1991, color: "#c0392b", size: 1.7 },
  { id: "29", title: "Back in Black", artist: "AC/DC", genre: "Rock", mood: "energetic", popularity: 95, year: 1980, color: "#b03020", size: 1.6 },

  { id: "30", title: "Lofi Study Beats", artist: "Chillhop Music", genre: "Lofi", mood: "calm", popularity: 80, year: 2019, color: "#9b59b6", size: 1.2 },
  { id: "31", title: "Rainy Day Lofi", artist: "Lofi Girl", genre: "Lofi", mood: "calm", popularity: 75, year: 2020, color: "#8e44ad", size: 1.1 },
  { id: "32", title: "Coffee Shop Vibes", artist: "ChilledCow", genre: "Lofi", mood: "calm", popularity: 78, year: 2021, color: "#9b59b6", size: 1.2 },
  { id: "33", title: "Midnight Lofi", artist: "Lofi Hip Hop Radio", genre: "Lofi", mood: "sad", popularity: 72, year: 2022, color: "#7d3c98", size: 1.1 },
  { id: "34", title: "Study with Me", artist: "Lofi Girl", genre: "Lofi", mood: "calm", popularity: 76, year: 2020, color: "#9b59b6", size: 1.2 },

  { id: "35", title: "God's Plan", artist: "Drake", genre: "HipHop", mood: "calm", popularity: 96, year: 2018, color: "#f39c12", size: 1.6 },
  { id: "36", title: "Sicko Mode", artist: "Travis Scott", genre: "HipHop", mood: "intense", popularity: 94, year: 2018, color: "#e08c00", size: 1.5 },
  { id: "37", title: "HUMBLE.", artist: "Kendrick Lamar", genre: "HipHop", mood: "intense", popularity: 95, year: 2017, color: "#f39c12", size: 1.6 },
  { id: "38", title: "Rockstar", artist: "Post Malone", genre: "HipHop", mood: "intense", popularity: 93, year: 2017, color: "#d48c00", size: 1.5 },
  { id: "39", title: "Sunflower", artist: "Post Malone", genre: "HipHop", mood: "happy", popularity: 94, year: 2018, color: "#f3ac22", size: 1.5 },
  { id: "40", title: "Old Town Road", artist: "Lil Nas X", genre: "HipHop", mood: "happy", popularity: 92, year: 2019, color: "#f39c12", size: 1.5 },

  { id: "41", title: "Blinding Lights (Remix)", artist: "The Weeknd", genre: "EDM", mood: "energetic", popularity: 91, year: 2020, color: "#00d2ff", size: 1.5 },
  { id: "42", title: "Titanium", artist: "David Guetta", genre: "EDM", mood: "energetic", popularity: 93, year: 2011, color: "#00c2ef", size: 1.5 },
  { id: "43", title: "Animals", artist: "Martin Garrix", genre: "EDM", mood: "energetic", popularity: 91, year: 2013, color: "#00d2ff", size: 1.5 },
  { id: "44", title: "Levels", artist: "Avicii", genre: "EDM", mood: "energetic", popularity: 94, year: 2011, color: "#10e2ff", size: 1.6 },
  { id: "45", title: "Wake Me Up", artist: "Avicii", genre: "EDM", mood: "happy", popularity: 93, year: 2013, color: "#00d2ff", size: 1.5 },
  { id: "46", title: "Lean On", artist: "Major Lazer", genre: "EDM", mood: "happy", popularity: 92, year: 2015, color: "#20c2ff", size: 1.5 },

  { id: "47", title: "Moonlight Sonata", artist: "Beethoven", genre: "Classical", mood: "calm", popularity: 90, year: 1801, color: "#f8f0e3", size: 1.5 },
  { id: "48", title: "Canon in D", artist: "Pachelbel", genre: "Classical", mood: "calm", popularity: 88, year: 1680, color: "#f0e8db", size: 1.4 },
  { id: "49", title: "Four Seasons - Spring", artist: "Vivaldi", genre: "Classical", mood: "happy", popularity: 87, year: 1723, color: "#f8f0e3", size: 1.4 },
  { id: "50", title: "Symphony No. 5", artist: "Beethoven", genre: "Classical", mood: "intense", popularity: 92, year: 1808, color: "#e8e0d3", size: 1.5 },

  { id: "51", title: "Gerua", artist: "Shah Rukh Khan", genre: "Romantic", mood: "romantic", popularity: 90, year: 2015, color: "#ff69b4", size: 1.5 },
  { id: "52", title: "Kal Ho Naa Ho", artist: "Sonu Nigam", genre: "Romantic", mood: "sad", popularity: 92, year: 2003, color: "#ff59a4", size: 1.5 },
  { id: "53", title: "Main Tenu Samjhawan", artist: "Atif Aslam", genre: "Romantic", mood: "sad", popularity: 88, year: 2014, color: "#ff79c4", size: 1.4 },
  { id: "54", title: "Pehli Nazar Mein", artist: "Atif Aslam", genre: "Romantic", mood: "romantic", popularity: 89, year: 2008, color: "#ff69b4", size: 1.4 },

  { id: "55", title: "Tere Bina", artist: "Sufi Ensemble", genre: "Sufi", mood: "spiritual", popularity: 85, year: 2010, color: "#c0392b", size: 1.4 },
  { id: "56", title: "Mast Qalandar", artist: "Nusrat Fateh Ali Khan", genre: "Sufi", mood: "spiritual", popularity: 92, year: 1990, color: "#a93226", size: 1.5 },
  { id: "57", title: "Dama Dam Mast Qalandar", artist: "Abida Parveen", genre: "Sufi", mood: "spiritual", popularity: 90, year: 1995, color: "#c0392b", size: 1.5 },
  { id: "58", title: "Yeh Jo Halka Halka Suroor", artist: "Nusrat Fateh Ali Khan", genre: "Sufi", mood: "calm", popularity: 88, year: 1985, color: "#b03020", size: 1.4 },

  { id: "59", title: "Dil Ki Baat", artist: "Jagjit Singh", genre: "Ghazal", mood: "sad", popularity: 87, year: 1988, color: "#8e44ad", size: 1.4 },
  { id: "60", title: "Hothon Se Chhu Lo Tum", artist: "Jagjit Singh", genre: "Ghazal", mood: "romantic", popularity: 90, year: 1990, color: "#9b59b6", size: 1.5 },
  { id: "61", title: "Tum Itna Jo Muskura Rahe Ho", artist: "Jagjit Singh", genre: "Ghazal", mood: "sad", popularity: 88, year: 1987, color: "#8e44ad", size: 1.4 },

  { id: "62", title: "Om Namah Shivaya", artist: "Anuradha Paudwal", genre: "Devotional", mood: "spiritual", popularity: 85, year: 1995, color: "#f1c40f", size: 1.4 },
  { id: "63", title: "Jai Shri Ram", artist: "Kumar Sanu", genre: "Devotional", mood: "spiritual", popularity: 83, year: 2000, color: "#f1c40f", size: 1.3 },
  { id: "64", title: "Hanuman Chalisa", artist: "Hariharan", genre: "Devotional", mood: "spiritual", popularity: 90, year: 2000, color: "#e1b400", size: 1.5 },

  { id: "65", title: "Dynamite", artist: "BTS", genre: "KPop", mood: "happy", popularity: 96, year: 2020, color: "#fd79a8", size: 1.6 },
  { id: "66", title: "Boy With Luv", artist: "BTS", genre: "KPop", mood: "happy", popularity: 94, year: 2019, color: "#fd89b8", size: 1.5 },
  { id: "67", title: "BLACKPINK", artist: "BLACKPINK", genre: "KPop", mood: "energetic", popularity: 93, year: 2019, color: "#fd69a0", size: 1.5 },
  { id: "68", title: "Kill This Love", artist: "BLACKPINK", genre: "KPop", mood: "intense", popularity: 91, year: 2019, color: "#ed5990", size: 1.5 },
  { id: "69", title: "DNA", artist: "BTS", genre: "KPop", mood: "happy", popularity: 92, year: 2017, color: "#fd79a8", size: 1.5 },

  { id: "70", title: "Despacito", artist: "Luis Fonsi", genre: "Latin", mood: "happy", popularity: 98, year: 2017, color: "#00b894", size: 1.7 },
  { id: "71", title: "Bailando", artist: "Enrique Iglesias", genre: "Latin", mood: "happy", popularity: 92, year: 2014, color: "#00c9a4", size: 1.5 },
  { id: "72", title: "Livin' La Vida Loca", artist: "Ricky Martin", genre: "Latin", mood: "energetic", popularity: 90, year: 1999, color: "#00b894", size: 1.5 },
  { id: "73", title: "Gasolina", artist: "Daddy Yankee", genre: "Latin", mood: "energetic", popularity: 88, year: 2004, color: "#00a880", size: 1.4 },
  { id: "74", title: "Con Calma", artist: "Daddy Yankee", genre: "Latin", mood: "happy", popularity: 89, year: 2019, color: "#00b894", size: 1.4 },

  { id: "75", title: "So What", artist: "Miles Davis", genre: "Jazz", mood: "calm", popularity: 87, year: 1959, color: "#6c5ce7", size: 1.4 },
  { id: "76", title: "Take Five", artist: "Dave Brubeck", genre: "Jazz", mood: "calm", popularity: 88, year: 1959, color: "#5c4cd7", size: 1.4 },
  { id: "77", title: "What a Wonderful World", artist: "Louis Armstrong", genre: "Jazz", mood: "happy", popularity: 92, year: 1967, color: "#7c6cf7", size: 1.5 },
  { id: "78", title: "Fly Me to the Moon", artist: "Frank Sinatra", genre: "Jazz", mood: "romantic", popularity: 90, year: 1964, color: "#6c5ce7", size: 1.5 },

  { id: "79", title: "Master of Puppets", artist: "Metallica", genre: "Metal", mood: "intense", popularity: 95, year: 1986, color: "#636e72", size: 1.6 },
  { id: "80", title: "Enter Sandman", artist: "Metallica", genre: "Metal", mood: "intense", popularity: 93, year: 1991, color: "#535e62", size: 1.5 },
  { id: "81", title: "Paranoid", artist: "Black Sabbath", genre: "Metal", mood: "intense", popularity: 91, year: 1970, color: "#636e72", size: 1.5 },
  { id: "82", title: "Iron Man", artist: "Black Sabbath", genre: "Metal", mood: "intense", popularity: 90, year: 1970, color: "#535e62", size: 1.4 },
];

export const PLAYLISTS = [
  {
    id: "p1",
    name: "Bollywood Vibes",
    emoji: "🎭",
    songIds: ["1", "2", "5", "6", "8", "9"],
  },
  {
    id: "p2",
    name: "Lofi Study",
    emoji: "📚",
    songIds: ["30", "31", "32", "33", "34"],
  },
  {
    id: "p3",
    name: "Rock Legends",
    emoji: "🎸",
    songIds: ["24", "25", "26", "27", "28"],
  },
  {
    id: "p4",
    name: "Chill Vibes",
    emoji: "🌊",
    songIds: ["47", "48", "49", "75", "76"],
  },
  {
    id: "p5",
    name: "Party Mix",
    emoji: "🎉",
    songIds: ["11", "42", "43", "44", "45", "65"],
  },
];

export const GENRES: Genre[] = [
  "Bollywood", "Hollywood", "Punjabi", "Rock", "Lofi",
  "HipHop", "EDM", "Classical", "Romantic", "Sufi",
  "Ghazal", "Devotional", "KPop", "Latin", "Jazz", "Metal",
];

export const MOODS: Mood[] = ["happy", "sad", "energetic", "calm", "romantic", "spiritual", "intense"];
