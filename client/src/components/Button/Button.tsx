import { useRef } from "react";
import { addSuperhero } from "../../lib/add-superhero";

export function Button() {
  const ref = useRef<HTMLInputElement>(null);
  function onSubmit() {
    if (!ref.current) return;
    const files = ref.current.files;
    if (!files) return;
    const formData = new FormData();

    formData.append("nickname", "Superman");
    formData.append("real_name", "Clark Kent");
    formData.append("origin_description", "Born with superpowers");
    formData.append("superpowers", "Flight");
    formData.append("catch_phrase", "I am Superman");

    // Append files to formData
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
    }
    console.log("submit");
    addSuperhero(formData);
  }
  return (
    <div>
      <button onClick={onSubmit}>Add Superhero</button>
      <input type="file" name="images" id="images" multiple={true} ref={ref} />
    </div>
  );
}

// .field("nickname", superheroText.nickname)
// .field("real_name", superheroText.real_name)
// .field("origin_description", superheroText.origin_description)
// .field("catch_phrase", superheroText.catch_phrase)
// .field("superpowers", superheroText.superpowers)
// .attach("images", path.join(filesDirName, legalFiles.webp[0]))
// .attach("images", path.join(filesDirName, legalFiles.jpg[0]))
// .attach("images", path.join(filesDirName, legalFiles.png[0]))
// .attach("images", path.join(filesDirName, legalFiles.png[1]))
// .attach("images", path.join(filesDirName, legalFiles.png[2]))
