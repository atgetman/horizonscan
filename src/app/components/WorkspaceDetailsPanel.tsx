import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Trash2, Pencil, X } from 'lucide-react';

interface WorkspaceDetails {
  description: string;
  matterType: string;
  status: string;
  client: string;
  keyDate: string;
  agentInstructions: string;
}

interface WorkspaceDetailsPanelProps {
  workspaceName: string;
}

const WORKSPACE_DATA: Record<string, WorkspaceDetails> = {
  "Hernandez v. Pacific Builders Inc": {
    description: "Construction defect litigation involving defective concrete work and alleged breach of contract, fraud, and negligent misrepresentation claims.",
    matterType: "Litigation",
    status: "Active",
    client: "Maria Hernandez",
    keyDate: "March 15, 2026",
    agentInstructions: "Focus on construction defect law and New York contract principles. Prioritize economic loss rule arguments and ensure all citations follow Bluebook format. When drafting motions, emphasize defendant's lack of specific allegations required under Rule 9(b)."
  },
  "Default Project": {
    description: "",
    matterType: "General",
    status: "Active",
    client: "N/A",
    keyDate: "TBD",
    agentInstructions: ""
  }
};

type ModalType = 'metadata' | 'instructions' | 'description' | null;

export function WorkspaceDetailsPanel({ workspaceName }: WorkspaceDetailsPanelProps) {
  const initialData = WORKSPACE_DATA[workspaceName] || WORKSPACE_DATA["Default Project"];
  const [details, setDetails] = useState<WorkspaceDetails>(initialData);
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [tempDetails, setTempDetails] = useState<WorkspaceDetails>(initialData);

  const handleOpenModal = (modal: ModalType) => {
    setTempDetails(details);
    setOpenModal(modal);
  };

  const handleSaveModal = () => {
    setDetails(tempDetails);
    setOpenModal(null);
    console.log('Saved:', tempDetails);
  };

  const handleCancelModal = () => {
    setTempDetails(details);
    setOpenModal(null);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      console.log('Delete project:', workspaceName);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 pt-2 space-y-4">
        {/* Description */}
        <div className="space-y-1.5 group">
          <div className="flex items-center justify-between mb-1.5">
            <div className="px-0 py-0 text-[13px] font-semibold text-[#212223]">Description</div>
            <button
              onClick={() => handleOpenModal('description')}
              className="flex items-center gap-1 px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-100 rounded transition-all opacity-0 group-hover:opacity-100"
            >
              <Pencil className="size-3" />
              Edit
            </button>
          </div>

          {details.description ? (
            <div 
              onClick={() => handleOpenModal('description')}
              className="relative min-h-[80px] max-h-32 bg-gray-50 border border-[#E3E4E6] rounded-lg cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden"
            >
              <p className="text-[12px] text-gray-700 leading-relaxed p-2.5">
                {details.description}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
            </div>
          ) : (
            <div 
              onClick={() => handleOpenModal('description')}
              className="relative min-h-[80px] max-h-32 bg-gray-50 border border-[#E3E4E6] rounded-lg cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden"
            >
              <p className="text-[12px] text-gray-400 italic p-2.5">
                No description set
              </p>
            </div>
          )}
        </div>

        {/* Agent Instructions */}
        <div className="pt-1 group">
          <div className="flex items-center justify-between mb-1.5">
            <div className="px-0 py-0 text-[13px] font-semibold text-[#212223]">Agent Instructions</div>
            <button
              onClick={() => handleOpenModal('instructions')}
              className="flex items-center gap-1 px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-100 rounded transition-all opacity-0 group-hover:opacity-100"
            >
              <Pencil className="size-3" />
              Edit
            </button>
          </div>

          {details.agentInstructions ? (
            <div 
              onClick={() => handleOpenModal('instructions')}
              className="relative min-h-[80px] max-h-32 bg-gray-50 border border-[#E3E4E6] rounded-lg cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden"
            >
              <p className="text-[12px] text-gray-700 leading-relaxed p-2.5">
                {details.agentInstructions}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
            </div>
          ) : (
            <div 
              onClick={() => handleOpenModal('instructions')}
              className="relative min-h-[80px] max-h-32 bg-gray-50 border border-[#E3E4E6] rounded-lg cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden"
            >
              <p className="text-[12px] text-gray-400 italic p-2.5">
                No instructions set
              </p>
            </div>
          )}
        </div>

        {/* Metadata Section */}
        <div className="pt-1 group">
          <div className="flex items-center justify-between mb-2">
            <div className="px-0 py-0 text-[13px] font-semibold text-[#212223]">Metadata</div>
            <button
              onClick={() => handleOpenModal('metadata')}
              className="flex items-center gap-1 px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-100 rounded transition-all opacity-0 group-hover:opacity-100"
            >
              <Pencil className="size-3" />
              Edit
            </button>
          </div>

          <div className="space-y-2">
            <InfoRow label="Matter Type" value={details.matterType} />
            <InfoRow label="Status" value={details.status} />
            <InfoRow label="Client" value={details.client} />
            <InfoRow label="Key Date" value={details.keyDate} />
          </div>
        </div>
      </div>

      {/* Metadata Edit Modal */}
      {openModal === 'metadata' && createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E3E4E6]">
              <h3 className="text-[16px] font-semibold text-[#212223]">Edit Metadata</h3>
              <button
                onClick={handleCancelModal}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="size-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-semibold text-gray-600 uppercase tracking-wide">
                    Fields
                  </label>
                  <button className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-[#1D4B34] transition-colors">
                    <Plus className="size-3" />
                    Add field
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value="Matter Type"
                      disabled
                      className="w-32 px-2.5 py-2 text-[12px] text-gray-500 bg-gray-50 border border-[#E3E4E6] rounded"
                    />
                    <input
                      type="text"
                      value={tempDetails.matterType}
                      onChange={(e) => setTempDetails({ ...tempDetails, matterType: e.target.value })}
                      className="flex-1 px-2.5 py-2 text-[13px] text-[#212223] bg-white border border-[#E3E4E6] rounded focus:outline-none focus:ring-2 focus:ring-[#1D4B34]/20 focus:border-[#1D4B34]"
                      placeholder="Enter value"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value="Status"
                      disabled
                      className="w-32 px-2.5 py-2 text-[12px] text-gray-500 bg-gray-50 border border-[#E3E4E6] rounded"
                    />
                    <input
                      type="text"
                      value={tempDetails.status}
                      onChange={(e) => setTempDetails({ ...tempDetails, status: e.target.value })}
                      className="flex-1 px-2.5 py-2 text-[13px] text-[#212223] bg-white border border-[#E3E4E6] rounded focus:outline-none focus:ring-2 focus:ring-[#1D4B34]/20 focus:border-[#1D4B34]"
                      placeholder="Enter value"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value="Client"
                      disabled
                      className="w-32 px-2.5 py-2 text-[12px] text-gray-500 bg-gray-50 border border-[#E3E4E6] rounded"
                    />
                    <input
                      type="text"
                      value={tempDetails.client}
                      onChange={(e) => setTempDetails({ ...tempDetails, client: e.target.value })}
                      className="flex-1 px-2.5 py-2 text-[13px] text-[#212223] bg-white border border-[#E3E4E6] rounded focus:outline-none focus:ring-2 focus:ring-[#1D4B34]/20 focus:border-[#1D4B34]"
                      placeholder="Enter value"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value="Key Date"
                      disabled
                      className="w-32 px-2.5 py-2 text-[12px] text-gray-500 bg-gray-50 border border-[#E3E4E6] rounded"
                    />
                    <input
                      type="text"
                      value={tempDetails.keyDate}
                      onChange={(e) => setTempDetails({ ...tempDetails, keyDate: e.target.value })}
                      className="flex-1 px-2.5 py-2 text-[13px] text-[#212223] bg-white border border-[#E3E4E6] rounded focus:outline-none focus:ring-2 focus:ring-[#1D4B34]/20 focus:border-[#1D4B34]"
                      placeholder="Enter value"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E3E4E6] bg-gray-50">
              <button
                onClick={handleCancelModal}
                className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModal}
                className="px-4 py-2 text-[13px] font-medium text-white bg-[#1D4B34] hover:bg-[#163a28] rounded transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Instructions Edit Modal */}
      {openModal === 'instructions' && createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E3E4E6]">
              <div>
                <h3 className="text-[16px] font-semibold text-[#212223]">Set project instructions</h3>
                <p className="text-[12px] text-gray-600 mt-1">
                  Provide CoCounsel with relevant instructions and information for chats within this project.
                </p>
              </div>
              <button
                onClick={handleCancelModal}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="size-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5">
              <textarea
                value={tempDetails.agentInstructions}
                onChange={(e) => setTempDetails({ ...tempDetails, agentInstructions: e.target.value })}
                rows={12}
                className="w-full px-4 py-3 text-[14px] text-[#212223] bg-white border border-[#E3E4E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4B34]/20 focus:border-[#1D4B34] resize-none leading-relaxed"
                placeholder="Use Artifacts only for web apps and code demos."
                autoFocus
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E3E4E6] bg-gray-50">
              <button
                onClick={handleCancelModal}
                className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModal}
                className="px-4 py-2 text-[13px] font-medium text-white bg-[#1D4B34] hover:bg-[#163a28] rounded transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Description Edit Modal */}
      {openModal === 'description' && createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E3E4E6]">
              <div>
                <h3 className="text-[16px] font-semibold text-[#212223]">Set project description</h3>
                <p className="text-[12px] text-gray-600 mt-1">
                  Provide a detailed description of the project to help CoCounsel understand the context.
                </p>
              </div>
              <button
                onClick={handleCancelModal}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="size-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5">
              <textarea
                value={tempDetails.description}
                onChange={(e) => setTempDetails({ ...tempDetails, description: e.target.value })}
                rows={12}
                className="w-full px-4 py-3 text-[14px] text-[#212223] bg-white border border-[#E3E4E6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D4B34]/20 focus:border-[#1D4B34] resize-none leading-relaxed"
                placeholder="Enter project description."
                autoFocus
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-[#E3E4E6] bg-gray-50">
              <button
                onClick={handleCancelModal}
                className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-200 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModal}
                className="px-4 py-2 text-[13px] font-medium text-white bg-[#1D4B34] hover:bg-[#163a28] rounded transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[11px] text-gray-500 w-20 shrink-0 pt-0.5">{label}</span>
      <span className="text-[13px] text-[#212223] font-medium">{value}</span>
    </div>
  );
}