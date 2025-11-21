
export default function ConexaoCard({ convite, onAceitar, onIgnorar }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <img
          src={convite.remetente.foto || '../../public/profilePicture.png'}
          alt={convite.remetente.nome}
          className="w-12 h-12 rounded-full object-cover border border-gray-100"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-gray-900 truncate">
            {convite.remetente.nome}
          </h4>
          <p className="text-xs text-gray-500 truncate">
            {convite.remetente.cargo}
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-1">
        <button
          onClick={() => onIgnorar(convite.id)}
          className="flex-1 py-1.5 px-3 border border-gray-300 text-gray-600 rounded-full text-xs font-medium hover:bg-gray-50 transition-colors"
        >
          Ignorar
        </button>
        <button
          onClick={() => onAceitar(convite.id)}
          className="flex-1 py-1.5 px-3 border border-blue-600 text-blue-600 rounded-full text-xs font-medium hover:bg-blue-50 transition-colors"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}