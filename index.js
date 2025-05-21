import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.use(express.static("public"))

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://bhagavad-gita3.p.rapidapi.com/v2/chapters/', {
      params: { skip: 0, limit: 18 },
      headers: {
        'x-rapidapi-key': '9231202028msh209f9d6e54f45d1p18094bjsn1a6d28abc34c',
        'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com'
      }
    });

    res.render("index.ejs", { result: response.data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch chapters' });
  }
});

app.get('/chapter/:chapterNumber', async (req, res) => {
  const chapterNumber = req.params.chapterNumber;

  const options = {
    method: 'GET',
    url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/`,
    headers: {
      'x-rapidapi-key': '9231202028msh209f9d6e54f45d1p18094bjsn1a6d28abc34c',
      'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com'
    }
  };

  const options2 = {
    method: 'GET',
    url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/verses/`,
    headers: {
      'x-rapidapi-key': '9231202028msh209f9d6e54f45d1p18094bjsn1a6d28abc34c',
      'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const chapterData = response.data;

    const response2 = await axios.request(options2);
    const chapterData2 = response2.data;


    // Render to EJS view with API data
    res.render('chapter.ejs', { chapter: chapterData, verses: chapterData2 });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching chapter');
  }
});

app.get('/chapter/:chapterNumber/verse/:verseNumber', async (req, res) => {
  const { chapterNumber, verseNumber } = req.params;


  const options = {
  method: 'GET',
    url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/verses/${verseNumber}/`,
    headers: {
      'x-rapidapi-key': '9231202028msh209f9d6e54f45d1p18094bjsn1a6d28abc34c',
      'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com'
    }
};


  try {
    const response = await axios.request(options);
    const verseData = response.data;

    // Make sure verse.ejs exists!
    res.render('verse.ejs', { verse: verseData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching verse');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
