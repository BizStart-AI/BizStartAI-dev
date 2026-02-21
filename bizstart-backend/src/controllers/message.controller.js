const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");
const { generateAIResponse } = require("../services/ai.service");
const AppError = require("../utils/AppError");


// POST /api/messages
const sendMessage = async (req, res, next) => {
  try {
    const { conversation_id, content } = req.body;

    if (!conversation_id || !content) {
      return next(
        new AppError("conversation_id and content are required", 400)
      );
    }

    // Validate conversation ownership
    const conversation = await Conversation.findOne({
      where: {
        id: conversation_id,
        user_id: req.user.id,
      },
    });

    if (!conversation) {
      return next(
        new AppError("Conversation not found or unauthorized", 404)
      );
    }

    // Save user message
    const userMessage = await Message.create({
      conversation_id,
      role: "user",
      content,
    });

    // Fetch conversation history
    const history = await Message.findAll({
      where: { conversation_id },
      order: [["createdAt", "ASC"]],
    });

    const formattedMessages = history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Retrieve RAG context
    const context = retrieveContext(content);

    // Call AI service
    const aiResult = await generateAIResponse(formattedMessages, context);

    // Save AI response
    const aiMessage = await Message.create({
      conversation_id,
      role: "assistant",
      content: aiResult.text,
      tokens_used: aiResult.tokens_used,
    });

    res.status(200).json({
      success: true,
      message: "Message processed successfully",
      data: {
        userMessage,
        aiMessage,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/messages/:conversationId
const getMessagesByConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    // Validate conversation ownership
    const conversation = await Conversation.findOne({
      where: {
        id: conversationId,
        user_id: req.user.id,
      },
    });

    if (!conversation) {
      return next(
        new AppError("Conversation not found or unauthorized", 404)
      );
    }

    const { count, rows } = await Message.findAndCountAll({
      where: { conversation_id: conversationId },
      order: [["createdAt", "ASC"]],
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getMessagesByConversation };
