import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  fetchAssistantQuestions,
  addAssistantQuestion,
  updateAssistantQuestion,
  deleteAssistantQuestion,
  fetchSpecializationsForAdmin,
} from "../../../services/adminService";
import { Bot, Plus, Pencil, Trash2, X, Tag } from "lucide-react";

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-2 mb-5">
    <div className="w-1 h-5 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
    <p className="font-bold text-[#0D2E4E] text-sm">{title}</p>
  </div>
);

const AdminHealthAssistant = () => {
  const [questions, setQuestions] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [keywords, setKeywords] = useState("");
  const [specializationId, setSpecializationId] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadData = async () => {
    try {
      const [questionsData, specializationsData] = await Promise.all([
        fetchAssistantQuestions(),
        fetchSpecializationsForAdmin(),
      ]);
      setQuestions(questionsData);
      setSpecializations(specializationsData);
    } catch (err) {
      console.error(err);
      alert("Failed to load data");
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadData();
    };
    init();
  }, []);

  const clearForm = () => {
    setQuestion("");
    setAnswer("");
    setKeywords("");
    setSpecializationId("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !question.trim() ||
      !answer.trim() ||
      !specializationId ||
      !keywords.trim()
    ) {
      alert("Please fill all fields");
      return;
    }
    const payload = {
      specialization_id: specializationId,
      question: question.trim(),
      answer: answer.trim(),
      keywords: keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    };
    try {
      if (editingId) {
        await updateAssistantQuestion(editingId, payload);
        alert("Question updated successfully");
      } else {
        await addAssistantQuestion(payload);
        alert("Question added successfully");
      }
      clearForm();
      loadData();
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setQuestion(item.question);
    setAnswer(item.answer);
    setSpecializationId(item.specialization_id);
    setKeywords((item.keywords || []).join(", "));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?",
    );
    if (!confirmDelete) return;
    try {
      await deleteAssistantQuestion(id);
      await loadData();
      alert("Question deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const inputClass =
    "w-full h-11 px-4 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none transition focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10";

  return (
    <DashboardLayout role="admin">
      <div className="bg-[#F0F4F8] min-h-screen">
        {/* Top strip */}
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            Manage health assistant questions and answers by specialization
          </p>
        </div>

        <div className="px-6 lg:px-12 py-8">
          {/* Page header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                Admin Portal
              </p>
              <h1 className="text-xl font-bold text-[#0D2E4E]">
                Health Assistant Management
              </h1>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* ── FORM ── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden sticky top-6">
                <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
                <div className="p-6">
                  {/* Form header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${editingId ? "bg-[#E8F4FD]" : "bg-gradient-to-br from-[#1A6FA8] to-[#336aac]"}`}
                      >
                        {editingId ? (
                          <Pencil size={14} className="text-[#1A6FA8]" />
                        ) : (
                          <Plus size={14} className="text-white" />
                        )}
                      </div>
                      <p className="font-bold text-[#0D2E4E] text-sm">
                        {editingId ? "Edit Question" : "Add New Question"}
                      </p>
                    </div>
                    {editingId && (
                      <button
                        onClick={clearForm}
                        className="w-7 h-7 rounded-lg bg-[#F7FAFE] border border-[#D6E6F2] flex items-center justify-center hover:bg-red-50 hover:border-red-100 transition"
                      >
                        <X size={13} className="text-[#6B839A]" />
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Specialization */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-1.5">
                        Specialization
                      </label>
                      <select
                        value={specializationId}
                        onChange={(e) => setSpecializationId(e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select Specialization</option>
                        {specializations.map((spec) => (
                          <option
                            key={spec.specialization_id}
                            value={spec.specialization_id}
                          >
                            {spec.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Question */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-1.5">
                        Question
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. How can I keep my heart healthy?"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    {/* Answer */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-1.5">
                        Answer
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Write a helpful answer..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none transition focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10 resize-none"
                      />
                    </div>

                    {/* Keywords */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-1.5">
                        Keywords
                      </label>
                      <input
                        type="text"
                        placeholder="heart, blood pressure, diet"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className={inputClass}
                      />
                      <p className="text-[10px] text-[#8AAEC8] mt-1.5">
                        Separate keywords with commas
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 h-10 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-xs font-bold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        {editingId ? "Update Question" : "Add Question"}
                      </button>
                      {editingId && (
                        <button
                          type="button"
                          onClick={clearForm}
                          className="h-10 px-4 text-xs font-bold rounded-xl bg-[#F7FAFE] border border-[#D6E6F2] text-[#4A6680] hover:bg-[#EEF5FC] transition"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* ── TABLE ── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
                <div className="px-6 py-5 border-b border-[#D6E6F2] flex items-center justify-between">
                  <SectionHeader title="Assistant Questions" />
                  <div className="bg-[#E8F4FD] text-[#1A6FA8] text-xs font-bold px-3 py-1.5 rounded-full -mt-5">
                    {questions.length} Total
                  </div>
                </div>

                {questions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mb-4">
                      <Bot size={24} className="text-[#1A6FA8]" />
                    </div>
                    <p className="text-[#0D2E4E] font-bold mb-1">
                      No Questions Yet
                    </p>
                    <p className="text-[#6B839A] text-sm">
                      Add your first health assistant question.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#F0F4F8]">
                    {questions.map((item) => (
                      <div
                        key={item.id}
                        className="px-6 py-4 hover:bg-[#F7FAFE] transition"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            {/* Specialization badge */}
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#1A6FA8] bg-[#E8F4FD] border border-[#D6E6F2] px-2 py-0.5 rounded-full mb-2">
                              {item.specializations?.name || "—"}
                            </span>

                            {/* Question */}
                            <p className="text-sm font-bold text-[#0D2E4E] mb-1.5 leading-snug">
                              {item.question}
                            </p>

                            {/* Keywords */}
                            {item.keywords?.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {item.keywords.map((kw, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#38B2A0] bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full"
                                  >
                                    <Tag size={8} />
                                    {kw}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Action buttons */}
                          <div className="flex gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => handleEdit(item)}
                              className="w-8 h-8 rounded-xl bg-[#E8F4FD] text-[#1A6FA8] flex items-center justify-center hover:bg-[#1A6FA8] hover:text-white transition"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminHealthAssistant;
