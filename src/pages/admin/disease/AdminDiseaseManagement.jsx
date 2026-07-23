import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  fetchDiseasesForAdmin,
  fetchSpecializationsForAdmin,
  addDisease,
  addSpecialization,
  updateDisease,
  deleteDisease,
} from "../../../services/adminService";
import LoadingSpinner from "../../../components/common/components/LoadingSpinner";
import { useLoading } from "../../../hooks/useLoading";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Activity,
  Stethoscope,
} from "lucide-react";

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-2 mb-5">
    <div className="w-1 h-5 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
    <p className="font-bold text-[#0D2E4E] text-sm">{title}</p>
  </div>
);

const AdminDiseaseManagement = () => {
  const [diseases, setDiseases] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [diseaseName, setDiseaseName] = useState("");
  const [specializationId, setSpecializationId] = useState("");
  const [specializationName, setSpecializationName] = useState("");
  const [editingDiseaseId, setEditingDiseaseId] = useState(null);
  const [editDiseaseName, setEditDiseaseName] = useState("");
  const [editSpecializationId, setEditSpecializationId] = useState("");
  const { loading, startLoading, stopLoading } = useLoading(true);

  const loadData = useCallback(async () => {
    try {
      startLoading();
      const diseasesData = await fetchDiseasesForAdmin();
      const specializationData = await fetchSpecializationsForAdmin();
      setDiseases(diseasesData);
      setSpecializations(specializationData);
    } catch (err) {
      console.error(err);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddDisease = async (e) => {
    e.preventDefault();
    if (!diseaseName || !specializationId) {
      alert("Please fill all fields");
      return;
    }
    try {
      await addDisease(diseaseName, specializationId);
      setDiseaseName("");
      setSpecializationId("");
      await loadData();
      alert("Disease added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add disease");
    }
  };

  const handleAddSpecialization = async (e) => {
    e.preventDefault();
    if (!specializationName) {
      alert("Enter specialization name");
      return;
    }
    try {
      await addSpecialization(specializationName);
      setSpecializationName("");
      await loadData();
      alert("Specialization added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add specialization");
    }
  };

  const handleEditDisease = (disease) => {
    setEditingDiseaseId(disease.diseases_id);
    setEditDiseaseName(disease.disease_name);
    setEditSpecializationId(disease.specialization_id);
  };

  const handleSaveDisease = async (diseaseId) => {
    try {
      await updateDisease(diseaseId, editDiseaseName, editSpecializationId);
      setEditingDiseaseId(null);
      await loadData();
      alert("Disease updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update disease");
    }
  };

  const handleDeleteDisease = async (diseaseId) => {
    const confirmDelete = window.confirm("Delete this disease?");
    if (!confirmDelete) return;
    try {
      await deleteDisease(diseaseId);
      await loadData();
      alert("Disease deleted");
    } catch (err) {
      console.error(err);
      alert("Failed to delete disease");
    }
  };

  const inputClass =
    "w-full h-11 px-4 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none focus:border-[#1A6FA8] focus:ring-2 focus:ring-[#1A6FA8]/10 transition";
  const inlineInputClass =
    "h-9 px-3 rounded-xl text-xs text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none focus:border-[#1A6FA8] focus:ring-2 focus:ring-[#1A6FA8]/10 transition w-full";

  return (
    <DashboardLayout role="admin">
      <div className="bg-[#F0F4F8] min-h-screen">
        {/* Top strip */}
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            Manage diseases and specializations for the recommendation system
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
                Disease & Specialization Management
              </h1>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Top forms row */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Add Specialization */}
                <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] to-[#38B2A0]" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-xl bg-[#E8F4FD] flex items-center justify-center">
                        <Stethoscope size={14} className="text-[#1A6FA8]" />
                      </div>
                      <p className="font-bold text-[#0D2E4E] text-sm">
                        Add Specialization
                      </p>
                    </div>
                    <form
                      onSubmit={handleAddSpecialization}
                      className="flex gap-3"
                    >
                      <input
                        type="text"
                        placeholder="e.g. Cardiology"
                        value={specializationName}
                        onChange={(e) => setSpecializationName(e.target.value)}
                        className={inputClass}
                      />
                      <button
                        type="submit"
                        className="h-11 px-5 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-xs font-bold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all flex-shrink-0 flex items-center gap-1.5"
                      >
                        <Plus size={13} /> Add
                      </button>
                    </form>
                  </div>
                </div>

                {/* Add Disease */}
                <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-[#336aac] to-[#38B2A0]" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-xl bg-teal-50 flex items-center justify-center">
                        <Activity size={14} className="text-[#38B2A0]" />
                      </div>
                      <p className="font-bold text-[#0D2E4E] text-sm">
                        Add Disease
                      </p>
                    </div>
                    <form
                      onSubmit={handleAddDisease}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <input
                        type="text"
                        placeholder="e.g. Heart Attack"
                        value={diseaseName}
                        onChange={(e) => setDiseaseName(e.target.value)}
                        className={inputClass}
                      />
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
                      <button
                        type="submit"
                        className="h-11 px-5 bg-gradient-to-r from-[#38B2A0] to-[#2d9e8f] text-white text-xs font-bold rounded-xl shadow-[0_4px_12px_rgba(56,178,160,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all flex-shrink-0 flex items-center gap-1.5"
                      >
                        <Plus size={13} /> Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Disease list */}
              <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
                <div className="px-6 py-5 border-b border-[#D6E6F2] flex items-center justify-between">
                  <SectionHeader title="Diseases List" />
                  <div className="bg-[#E8F4FD] text-[#1A6FA8] text-xs font-bold px-3 py-1.5 rounded-full -mt-5">
                    {diseases.length} Total
                  </div>
                </div>

                {diseases.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mb-3">
                      <Activity size={20} className="text-[#1A6FA8]" />
                    </div>
                    <p className="text-[#0D2E4E] font-bold text-sm">
                      No Diseases Found
                    </p>
                    <p className="text-[#6B839A] text-xs mt-1">
                      Add your first disease above.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#F7FAFE] border-b border-[#D6E6F2]">
                          <th className="text-left px-5 py-3 text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                            Disease
                          </th>
                          <th className="text-left px-5 py-3 text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                            Specialization
                          </th>
                          <th className="text-left px-5 py-3 text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F0F4F8]">
                        {diseases.map((disease) => (
                          <tr
                            key={disease.diseases_id}
                            className="hover:bg-[#F7FAFE] transition"
                          >
                            <td className="px-5 py-3">
                              {editingDiseaseId === disease.diseases_id ? (
                                <input
                                  type="text"
                                  value={editDiseaseName}
                                  onChange={(e) =>
                                    setEditDiseaseName(e.target.value)
                                  }
                                  className={inlineInputClass}
                                />
                              ) : (
                                <span className="font-semibold text-[#0D2E4E] text-sm">
                                  {disease.disease_name}
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-3">
                              {editingDiseaseId === disease.diseases_id ? (
                                <select
                                  value={editSpecializationId}
                                  onChange={(e) =>
                                    setEditSpecializationId(e.target.value)
                                  }
                                  className={inlineInputClass}
                                >
                                  {specializations.map((spec) => (
                                    <option
                                      key={spec.specialization_id}
                                      value={spec.specialization_id}
                                    >
                                      {spec.name}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-[#E8F4FD] text-[#1A6FA8] text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#D6E6F2]">
                                  {disease.specializations?.name || "Unknown"}
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex gap-1.5">
                                {editingDiseaseId === disease.diseases_id ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleSaveDisease(disease.diseases_id)
                                      }
                                      className="w-8 h-8 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white transition"
                                    >
                                      <Check size={13} />
                                    </button>
                                    <button
                                      onClick={() => setEditingDiseaseId(null)}
                                      className="w-8 h-8 rounded-xl bg-[#F7FAFE] border border-[#D6E6F2] text-[#6B839A] flex items-center justify-center hover:bg-gray-100 transition"
                                    >
                                      <X size={13} />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleEditDisease(disease)}
                                      className="w-8 h-8 rounded-xl bg-[#E8F4FD] text-[#1A6FA8] flex items-center justify-center hover:bg-[#1A6FA8] hover:text-white transition"
                                    >
                                      <Pencil size={13} />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteDisease(disease.diseases_id)
                                      }
                                      className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDiseaseManagement;
