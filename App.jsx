
import { useState } from "react";
import "./App.css";

const stories = [
  {
    id: 1,
    category: "Breaking News",
    title: "SPIDER-MAN: HERO OR MENACE?",
    date: "October 30, 2026",
    image: "/1.avif",
    description: "New York is divided over its mysterious masked hero. While some citizens call Spider-Man a saviour, others believe his actions bring danger to the city. The Daily Bugle investigates."
  },
  {
    id: 2,
    category: "Superheroes",
    title: "THE WEB-SLINGER STRIKES AGAIN",
    date: "October 29, 2026",
    image: "/2.jpg",
    description: "Another mysterious appearance has been reported across Manhattan. Witnesses claim Spider-Man was seen swinging between the city's skyscrapers."
  },
  {
    id: 3,
    category: "New York",
    title: "MANHATTAN WAKES UP TO CHAOS",
    date: "October 28, 2026",
    image: "/3.webp",
    description: "An unusual incident has attracted attention across Manhattan. Residents are waiting for an official statement from the authorities."
  },
  {
    id: 4,
    category: "Technology",
    title: "OSCORP'S NEXT BIG INVENTION",
    date: "October 27, 2026",
    image: "/4.jpg",
    description: "Oscorp is reportedly working on advanced technology. Experts are questioning how its latest invention could affect New York."
  },
  {
    id: 5,
    category: "Superheroes",
    title: "WHO IS THE PERSON BEHIND THE MASK?",
    date: "October 26, 2026",
    image: "/5.jpg",
    description: "The identity of Spider-Man remains a mystery. The Bugle newsroom continues its investigation into the masked hero."
  },
  {
    id: 6,
    category: "Breaking News",
    title: "MYSTERIOUS INCIDENT NEAR TIMES SQUARE",
    date: "October 25, 2026",
    image: "/6.jpg",
    description: "A mysterious incident has attracted a crowd in New York. Witnesses have reported seeing Spider-Man near the area."
  },
  {
    id: 7,
    category: "Technology",
    title: "THE FUTURE OF NEW YORK IS HERE",
    date: "October 24, 2026",
    image: "/7.jpg",
    description: "New technology is changing the future of New York. Companies are competing to build the next big innovation."
  },
  {
    id: 8,
    category: "New York",
    title: "LIFE IN THE CITY THAT NEVER SLEEPS",
    date: "October 23, 2026",
    image: "/3.webp",
    description: "From crowded streets to glowing skyscrapers, New York continues to surprise its residents every day."
  }
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showSaved, setShowSaved] = useState(false);

  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("debugger-saved") || "[]");
    } catch {
      return [];
    }
  });

  const [dark, setDark] = useState(
    () => localStorage.getItem("bugle-theme") === "dark"
  );

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("bugle-theme", next ? "dark" : "light");
  }

  function toggleSave(id) {
    const updated = saved.includes(id)
      ? saved.filter(item => item !== id)
      : [...saved, id];

    setSaved(updated);
    localStorage.setItem("debugger-saved", JSON.stringify(updated));
  }

  const filtered = stories.filter(item =>
    (item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())) &&
    (category === "All" || item.category === category)
  );

  const displayed = showSaved
    ? stories.filter(item => saved.includes(item.id))
    : filtered;

  function goHome() {
    setSelected(null);
    setShowSaved(false);
    setCategory("All");
    setSearch("");
  }

  return (
    <div className={`bugle ${dark ? "dark-mode" : ""}`}>
      <div className="top-strip">
        NEW YORK'S FICTIONAL NEWSROOM • ALL THE NEWS THAT'S FIT TO PRINT
      </div>

      <header className="bugle-header">
        <div className="header-side">
          <p>THE CITY'S MOST<br />TALKED ABOUT NEWS</p>
        </div>

        <div className="bugle-logo" onClick={goHome}>
          <span className="logo-small">THE</span>
          <h1>DEBUGGER<span>!</span></h1>
          <p>NEW YORK • CITY EDITION</p>
        </div>

        <div className="header-side right">
          <p>FRIDAY EDITION</p>
          <h3>OCTOBER 30, 2026</h3>
          <p>PRICE: FREE</p>
        </div>
      </header>

      <nav className="bugle-nav">
        <button onClick={goHome}>HOME</button>

        <button onClick={() => {
          setCategory("Breaking News");
          setShowSaved(false);
          setSelected(null);
        }}>BREAKING</button>

        <button onClick={() => {
          setCategory("Superheroes");
          setShowSaved(false);
          setSelected(null);
        }}>SUPERHEROES</button>

        <button onClick={() => {
          setShowSaved(true);
          setSelected(null);
        }}>★ SAVED ({saved.length})</button>

        <button className="theme-button" onClick={toggleTheme}>
          {dark ? "☀ LIGHT MODE" : "☾ DARK MODE"}
        </button>
      </nav>

      <main className="bugle-main">
        <div className="breaking-bar">
          <span>BREAKING NEWS</span>
          <p>SPIDER-MAN SPOTTED AGAIN IN NEW YORK CITY!</p>
        </div>

        {selected ? (
          <article className="bugle-article">
            <button className="back-button" onClick={() => setSelected(null)}>
              ← BACK TO FRONT PAGE
            </button>

            <img src={selected.image} alt={selected.title} />

            <p className="story-category">{selected.category}</p>
            <h1>{selected.title}</h1>
            <p className="story-date">
              {selected.date} • THE DEBUGGER STAFF
            </p>

            <div className="article-rule" />

            <p className="article-body">{selected.description}</p>

            <p className="fiction-note">
              This is a fictional fan-made news story.
            </p>

            <button className="save-button" onClick={() => toggleSave(selected.id)}>
              {saved.includes(selected.id) ? "★ SAVED" : "☆ SAVE FOR LATER"}
            </button>
          </article>
        ) : (
          <>
            {!showSaved && (
              <section className="lead-story">
                <div className="lead-image">
                  <img src={stories[0].image} alt="Spider-Man headline" />
                  <span>EXCLUSIVE REPORT</span>
                </div>

                <div className="lead-content">
                  <p className="story-category">
                    SPECIAL EDITION • SUPERHEROES
                  </p>

                  <h2>SPIDER-MAN: HERO OR MENACE?</h2>

                  <p>
                    New York's mysterious web-slinger is back.
                    The city wants answers. The Daily Bugle inspired
                    newsroom investigates!
                  </p>

                  <p className="story-date">
                    OCTOBER 30, 2026 • 5 MIN READ
                  </p>

                  <button onClick={() => setSelected(stories[0])}>
                    READ FULL STORY →
                  </button>
                </div>
              </section>
            )}

            <div className="section-title">
              <h2>{showSaved ? "YOUR SAVED STORIES" : "LATEST HEADLINES"}</h2>
              <span>THE CITY NEVER SLEEPS</span>
            </div>

            {!showSaved && (
              <div className="controls">
                <input
                  placeholder="Search the newsroom..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />

                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Breaking News">Breaking News</option>
                  <option value="New York">New York</option>
                  <option value="Technology">Technology</option>
                  <option value="Superheroes">Superheroes</option>
                </select>

                <button onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}>RESET</button>
              </div>
            )}

            <section className="story-grid">
              {displayed.map(item => (
                <article className="story-card" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    onClick={() => setSelected(item)}
                  />

                  <div className="story-info">
                    <p className="story-category">{item.category}</p>

                    <h3 onClick={() => setSelected(item)}>
                      {item.title}
                    </h3>

                    <p className="story-date">{item.date}</p>

                    <div className="story-actions">
                      <button onClick={() => setSelected(item)}>
                        READ STORY →
                      </button>

                      <button
                        className="bookmark"
                        onClick={() => toggleSave(item.id)}
                        title="Save story"
                      >
                        {saved.includes(item.id) ? "★" : "☆"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {displayed.length === 0 && (
              <p className="no-stories">
                {showSaved
                  ? "You have not saved any stories yet."
                  : "No stories found."}
              </p>
            )}
          </>
        )}
      </main>

      <footer className="bugle-footer">
        <h2>DEBUGGER<span>!</span></h2>
        <p>INDEPENDENT STUDENT NEWS PROJECT • NEW YORK CITY EDITION</p>
        <p>
          Unofficial fictional fan-made educational project.
          Spider-Man and related characters belong to Marvel.
        </p>
        <p>© 2026 DEBUGGER</p>
      </footer>
    </div>
  );
}

export default App;
