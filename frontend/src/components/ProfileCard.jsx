import React from 'react';
import { MapPin, Briefcase, Zap } from 'lucide-react';

const ProfileCard = ({ profile }) => {
    const { nome, foto, cargo, localizacao, habilidadesTecnicas } = profile;

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-slate-200 transition duration-300 hover:shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
                {/* Imagem do Perfil */}
                <img
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 p-0.5"
                    src={foto}
                    alt={`Foto de perfil de ${nome}`}
                />
                <div className="flex-1">
                    {/* Nome e Cargo */}
                    <h3 className="text-xl font-bold text-slate-800 hover:text-blue-600 transition duration-150 cursor-pointer">
                        {nome}
                    </h3>
                    <p className="text-sm text-slate-500 flex items-center">
                        <Briefcase className="w-4 h-4 mr-1 text-blue-500" />
                        {cargo}
                    </p>
                </div>
            </div>

            {/* Localização */}
            <div className="flex items-center text-sm text-slate-600 mb-4">
                <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                {localizacao}
            </div>

            {/* Habilidades */}
            <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                    Principais Habilidades:
                </h4>
                <div className="flex flex-wrap gap-2">
                    {habilidadesTecnicas.map((habilidade, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                        >
                            {habilidade}
                        </span>
                    ))}
                </div>
            </div>

            {/* Botão de Conexão */}
            <button
                className="w-full py-2 mt-2 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => console.log(`Conectar com ${nome}`)}
            >
                Conectar
            </button>
        </div>
    );
};

export default ProfileCard;

export const ProfileCardContainer = ({ profiles }) => {
    return (
        <div className="bg-white shadow-2xl rounded-xl p-6 mb-8 border-t-4 border-blue-600">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-6 border-b pb-2">
                Pessoas que você talvez conheça
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {profiles.map(profile => (
                    <ProfileCard key={profile.id} profile={profile} />
                ))}
            </div>
            <div className="text-center mt-6">
                <button className="text-blue-600 font-semibold hover:text-blue-800 transition duration-150">
                    Ver mais sugestões &rarr;
                </button>
            </div>
        </div>
    );
};
