"use client";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  steps: string[];
}

export default function Modal({ open, onClose, steps }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[500px] max-h-[80vh] overflow-auto shadow-lg">

        <h2 className="text-xl font-bold mb-4">Passo a passo — Mediana das Medianas</h2>

        <ul className="text-sm flex flex-col gap-3">
          {steps.map((step, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded-md border">
              <strong>Passo {index + 1}:</strong> {step}
            </li>
          ))}
        </ul>

        <button
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
