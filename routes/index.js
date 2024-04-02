var express = require('express');
var router = express.Router();
var app = express();
const nodemailer = require('nodemailer');

router.use(express.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/all-trending-movies', function(req, res, next) {
  res.render('all-trending-movies'); // Render the HTML page for all trending movies
});

router.get('/gift-friend', function(req, res, next) {
  res.render('gift-friend'); // Render the HTML page for all trending movies
});

router.get('/movie-details', async (req, res) => {
  const { movieId, movieTitle, movieOverview, posterPath } = req.query;
  
  try {
    const apiKey = "df2c6de7e8ef7c7485ddf9aaf8f0204f";
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits,videos,recommendations`;
    const response = await fetch(apiUrl);
    const movieDetails = await response.json();

    res.render('movie-details', { 
      movieId, 
      movieTitle, 
      movieOverview, 
      posterPath,

      releaseDate: movieDetails.release_date,
      genre: movieDetails.genres.map(genre => genre.name).join(', '),
      rating: movieDetails.vote_average,
      runtime: movieDetails.runtime,
      cast: movieDetails.credits.cast,
      trailers: movieDetails.videos.results.filter(video => video.type === "Trailer"),
      recommendations: movieDetails.recommendations.results,
      // Add more details as needed
    });
  } catch (error) {
    console.error("Error fetching movie details:", error);
    // Rendered the page with basic information if there's an error
    res.render('movie-details', { movieId, movieTitle, movieOverview, posterPath });
  }
});

router.get('/purchased', async (req, res) => {
  // Rendered the purchase tokens form using EJS
  const { movieId, movieTitle, movieOverview, posterPath } = req.query;
  res.render('purchasedSep', { movieTitle, movieOverview, posterPath });
});

router.get('/learn', function(req, res, next) {
  res.render('learn'); // Render the HTML page for all trending movies
});


router.get('/contact', function(req, res, next) {
  res.render('contact'); // Render the HTML page for all trending movies
});

router.get('/owner', function(req, res, next) {
  res.render('owner'); // Render the HTML page for all trending movies
});

router.post('/send-email', function(req, res, next) {
  const {email, message } = req.body;
  console.log("Email received:", email);
  console.log("Message received:", message);

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'dammyadetugboboh@gmail.com',
          pass: 'xalr csao hcyw bhst'
      }
  });

  // Email options
  const mailOptions = {
      from: 'damisinterfaces@gmail.com',
      to: email,
      subject: 'Your Inquiry Has Been Received',
      text: `Dear Customer,\n\nThank you for reaching out to us. We have received your inquiry and will address it as soon as possible. Here is a copy of your message:\n\n${message}\n\nIf you have any further questions or concerns, feel free to contact us again.\n\nBest Regards,\nDSA`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          res.send('Error sending email.');
      } else {
          console.log('Email sent: ' + info.response);
          res.send('Ticket has been raised and You will receive an email shortly. Gracias!');
      }
  });
});

module.exports = router;
