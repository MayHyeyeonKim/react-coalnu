import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./App.css";

function App() {
  return (
    <main className="app">
      <header className="header">
        <div className="logo">P</div>
        <div>
          <h1>Phone Book</h1>
          <p>Keep your contacts in one place.</p>
        </div>
      </header>

      <div className="content">
        <section className="card">
          <ContactForm />
        </section>
        <section className="card">
          <ContactList />
        </section>
      </div>
    </main>
  );
}

export default App;
