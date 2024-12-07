const { default: mongoose } = require("mongoose");

const todoSchema = new mongoose.Schema({
    todo: String,
    isCompleted: Boolean,
    user:{ type: mongoose.Types.ObjectId, ref: "users" }
});

const TodoModal = mongoose.models.todos || mongoose.model('todos', todoSchema);

export default TodoModal;
