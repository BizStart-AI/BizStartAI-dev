const express = require('express');
const cors = require('cors');

// Middleware
const { apiLimiter } = require('./middleware/rateLimit.middleware');
const authenticate = require('./middleware/auth.middleware');
const errorHandler = require('./middleware/error.middleware');

// Routes
const authRoutes = require('./routes/auth.routes');
const conversationRoutes = require('./routes/conversation.routes');
const messageRoutes = require('./routes/message.routes');
const userRoutes = require('./routes/user.routes');
const aiRoutes = require('./routes/ai.routes');
const progressRoutes = require('./routes/progress.routes');

const app = express();
app.set('trust proxy', 1);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://bizstart-ai.vercel.app", /\.vercel\.app$/],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());
app.use('/api', apiLimiter);

// register core routes
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/progress', progressRoutes);

// temporary route fix for frontend calling wrong endpoint
app.post('/api/recommendations', async (req, res, next) => {
  try {
    const { industry, stage } = req.body;

    const recommendations = [
      {
        title: 'Market Entry Strategy',
        description: `Learn how to find customers for your ${industry || 'new'} business.`,
        lessons: 5,
        duration: 25,
        level: 'Beginner'
      },
      {
        title: 'Scaling Operations',
        description: `Build a solid growth plan for your ${stage || 'early'} stage idea.`,
        lessons: 4,
        duration: 20,
        level: stage === 'growth' ? 'Advanced' : 'Beginner'
      }
    ];

    return res.status(200).json({ success: true, data: recommendations });
  } catch (error) {
    next(error);
  }
});

// test protected route
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

// health check
app.get('/', (req, res) => {
  res.json({ message: 'BizStart AI Backend Running' });
});

// global error handler (must be last)
app.use(errorHandler);

module.exports = app;
