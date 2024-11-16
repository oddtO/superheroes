import { useEffect } from "react";
import styles from "./App.module.scss";
import { getSuperheroes, getSuperheroById } from "./lib/get-superheroes";
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
  useEffect(() => {
    async function getSuperheroByIdWrapper(id: string) {
      try {
        const superhero = await getSuperheroById(id);
        console.log(superhero);
      } catch (err) {
        console.error(err);
      }
    }

    getSuperheroByIdWrapper("1");
    getSuperheroByIdWrapper("2");
    getSuperheroByIdWrapper("3");
  });
  return (
    <>
      <div className={styles.app}>Hello World</div>
    </>
  );
}

export default App;
