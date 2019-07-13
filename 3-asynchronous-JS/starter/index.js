const fs = require("fs");
const superagent = require("superagent");

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("File not found.");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject("File could not be written.");
      resolve("Success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro("dog-img.txt", res.body.message);
    console.log("Random dog image saved to file!");
  } catch (err) {
    console.log(err);

    throw err;
  }
  return "Dog pic!";
};

(async () => {
  try {
    console.log("Getting dog pic...");
    const x = await getDogPic();
    console.log(x);
    console.log("Done getting dog pic!");
  } catch (err) {
    console.log(err);
  }
})();

/* getDogPic(); */

/* readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);
    return writeFilePro("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file!");
  })
  .catch(err => {
    console.log(err);
  });
 */
