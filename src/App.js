import Dictionary from "./Dictionary";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <Dictionary defaultKeyword="forest"/>
      </main>
      <footer className="App-footer">
        <small> This project was coded by <a href="https://github.com/Dan-ast" target="_blank">Anastasiia Dekret</a> and is open-sourced on <a href="https://github.com/Dan-ast/dictionary-app" target="_blank">GitHub</a> and hosted on <a href="https://react-dictionary-webapp.netlify.app/" target="_blank">Netlify</a>. </small>
      </footer>
    </div>
  );
}

export default App;
