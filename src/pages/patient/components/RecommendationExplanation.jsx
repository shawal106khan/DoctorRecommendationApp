// import { Brain, Zap, BookOpen } from "lucide-react";

// const RecommendationExplanation = ({ diseaseName, specializationName }) => {
//   if (!diseaseName || !specializationName) return null;

//   return (
//     <div className="mb-6 bg-white border border-[#D6E6F2] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(26,111,168,0.08)]">
//       <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
//       <div className="p-5">
//         {/* Header */}
//         <div className="flex items-center gap-2.5 mb-4">
//           <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center shadow-[0_2px_8px_rgba(26,111,168,0.30)]">
//             <Brain size={16} className="text-white" />
//           </div>
//           <div>
//             <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-widest">
//               Expert System
//             </p>
//             <h3 className="text-sm font-bold text-[#0D2E4E]">
//               AI Recommendation Result
//             </h3>
//           </div>
//         </div>

//         {/* Disease + Specialist */}
//         <div className="grid grid-cols-2 gap-3 mb-4">
//           <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-3 py-2.5">
//             <p className="text-[9px] font-bold text-[#4A6680] uppercase tracking-wide mb-0.5">
//               Selected Disease
//             </p>
//             <p className="text-xs font-bold text-[#0D2E4E]">{diseaseName}</p>
//           </div>
//           <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-3 py-2.5">
//             <p className="text-[9px] font-bold text-[#4A6680] uppercase tracking-wide mb-0.5">
//               Matched Specialist
//             </p>
//             <p className="text-xs font-bold text-[#1A6FA8]">
//               {specializationName}
//             </p>
//           </div>
//         </div>

//         {/* Rule */}
//         <div className="bg-gradient-to-r from-[#E8F4FD] to-[#F0F7FF] border border-[#D6E6F2] rounded-xl px-4 py-3 mb-3 flex items-start gap-2">
//           <Zap size={13} className="text-[#1A6FA8] flex-shrink-0 mt-0.5" />
//           <div className="font-mono text-[10px] text-[#1A6FA8] leading-relaxed">
//             <span className="font-bold">IF</span> Disease = {diseaseName}
//             <br />
//             <span className="font-bold">THEN</span> Specialist ={" "}
//             {specializationName}
//           </div>
//         </div>

//         {/* Description */}
//         <div className="flex items-start gap-2">
//           <BookOpen size={12} className="text-[#8AAEC8] flex-shrink-0 mt-0.5" />
//           <p className="text-[11px] text-[#6B839A] leading-relaxed">
//             The system applied a production rule from the knowledge base and
//             selected the appropriate medical specialization before recommending
//             doctors.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecommendationExplanation;
