import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Award, Code, Users, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainPage() {
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar profissionais da API
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/professionals');
        
        if (!response.ok) {
          throw new Error('Erro ao buscar profissionais');
        }
        
        const data = await response.json();
        setProfessionals(data.data);
        setFilteredProfessionals(data.data);
        setError(null);
      } catch (err) {
        console.error('Erro:', err);
        setError('Não foi possível carregar os profissionais. Verifique se o servidor está rodando.');
        // Fallback para dados locais em caso de erro
        setProfessionals([]);
        setFilteredProfessionals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = professionals.filter(prof =>
      prof.nome.toLowerCase().includes(value.toLowerCase()) ||
      prof.cargo.toLowerCase().includes(value.toLowerCase()) ||
      prof.area.toLowerCase().includes(value.toLowerCase()) ||
      prof.habilidades.some(h => h.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredProfessionals(filtered);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} onLogin={handleLogin} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Rede Profissional do Futuro
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Explore e conecte-se com profissionais talentosos de diversas áreas
          </p>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome, cargo, área ou habilidade..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-lg border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">Carregando profissionais...</p>
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="mb-6">
            <p className="text-slate-600">
              Mostrando <span className="font-bold text-slate-900">{filteredProfessionals.length}</span> profissional(is)
            </p>
          </div>
        )}

        {/* Professionals Grid */}
        {!loading && filteredProfessionals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">Nenhum profissional encontrado</p>
          </div>
        ) : (
          !loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredProfessionals.map((professional) => (
                <div
                  key={professional.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden border border-slate-200 hover:border-blue-400"
                  onClick={() => setSelectedProfessional(professional)}
                >
                  <div className="p-6">
                    {/* Profile Image */}
                    <div className="flex justify-center mb-4">
                      <img
                        src={professional.foto}
                        alt={professional.nome}
                        className="w-24 h-24 rounded-full border-4 border-blue-100 object-cover"
                      />
                    </div>

                    {/* Name and Title */}
                    <h3 className="text-xl font-bold text-slate-900 text-center mb-1">
                      {professional.nome}
                    </h3>
                    <p className="text-blue-600 font-semibold text-center mb-3">
                      {professional.cargo}
                    </p>

                    {/* Location */}
                    <div className="flex items-center justify-center gap-2 text-slate-600 mb-3">
                      <MapPin size={16} />
                      <span className="text-sm">{professional.localização}</span>
                    </div>

                    {/* Summary */}
                    <p className="text-slate-600 text-sm text-center mb-4 line-clamp-2">
                      {professional.resumo}
                    </p>

                    {/* Area Badge */}
                    <div className="flex justify-center mb-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {professional.area}
                      </span>
                    </div>

                    {/* Skills Preview */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {professional.habilidades.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {professional.habilidades.length > 3 && (
                          <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
                            +{professional.habilidades.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* View Profile Button */}
                    <button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProfessional(professional);
                      }}
                    >
                      Ver Perfil Completo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </main>

      {/* Profile Modal */}
      {selectedProfessional && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <img
                  src={selectedProfessional.foto}
                  alt={selectedProfessional.nome}
                  className="w-20 h-20 rounded-full border-4 border-blue-100 object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {selectedProfessional.nome}
                  </h2>
                  <p className="text-blue-600 font-semibold">{selectedProfessional.cargo}</p>
                  <div className="flex items-center gap-2 text-slate-600 mt-1">
                    <MapPin size={16} />
                    <span className="text-sm">{selectedProfessional.localização}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProfessional(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Summary */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Resumo Profissional</h4>
                <p className="text-slate-600">{selectedProfessional.resumo}</p>
              </div>

              {/* Area */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Área de Atuação</h4>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedProfessional.area}
                </span>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Code size={18} /> Habilidades Técnicas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProfessional.habilidades.map((skill, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Users size={18} /> Soft Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProfessional.softSkills.map((skill, idx) => (
                    <span key={idx} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Briefcase size={18} /> Experiência Profissional
                </h4>
                <div className="space-y-3">
                  {selectedProfessional.experiencias.map((exp, idx) => (
                    <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-semibold text-slate-900">{exp.cargo}</p>
                      <p className="text-blue-600 text-sm">{exp.empresa}</p>
                      <p className="text-slate-500 text-sm">{exp.periodo}</p>
                      <p className="text-slate-600 text-sm mt-1">{exp.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award size={18} /> Formação Acadêmica
                </h4>
                <div className="space-y-3">
                  {selectedProfessional.formacao.map((edu, idx) => (
                    <div key={idx} className="border-l-4 border-green-500 pl-4 py-2">
                      <p className="font-semibold text-slate-900">{edu.curso}</p>
                      <p className="text-green-600 text-sm">{edu.instituicao}</p>
                      <p className="text-slate-500 text-sm">{edu.periodo}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {selectedProfessional.certificacoes.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Certificações</h4>
                  <ul className="space-y-2">
                    {selectedProfessional.certificacoes.map((cert, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-600">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Languages */}
              {selectedProfessional.idiomas.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Idiomas</h4>
                  <ul className="space-y-2">
                    {selectedProfessional.idiomas.map((idioma, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-600">
                        <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                        {idioma}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Areas of Interest */}
              {selectedProfessional.areaInteresse.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Áreas de Interesse</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfessional.areaInteresse.map((area, idx) => (
                      <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
