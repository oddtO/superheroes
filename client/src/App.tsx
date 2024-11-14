import { useEffect } from "react";
import styles from "./App.module.scss";
import { getSuperheroes } from "./lib/get-superheroes";
function App() {
  useEffect(() => {
    async function getSuperheroesWrapper() {
      try {
        const superheroes = await getSuperheroes();
        console.log(superheroes);
      } catch (err) {
        console.error(err);
      }
    }

    getSuperheroesWrapper();
  });
  return (
    <>
      <div className={styles.app}>Hello World</div>
    </>
  );
}

export default App;
