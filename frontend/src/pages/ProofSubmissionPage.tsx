import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle2, AlertTriangle, ArrowLeft, Cpu, ShieldAlert, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { Commitment, VerificationResult } from '../types';

export const ProofSubmissionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [commitment, setCommitment] = useState<Commitment | null>(null);
  const [proofType, setProofType] = useState<'image' | 'text'>('image');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [textContent, setTextContent] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCommitment = async () => {
      try {
        const res = await api.get(`/commitments/${id}`);
        if (res.data.success) {
          setCommitment(res.data.data);
          if (res.data.data.proofType === 'text') setProofType('text');
        }
      } catch (e) {}
    };
    if (id) fetchCommitment();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit.');
        return;
      }
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setVerificationResult(null);

    try {
      const formData = new FormData();
      formData.append('proofType', proofType);
      
      if (proofType === 'image' && selectedFile) {
        formData.append('file', selectedFile);
      } else if (proofType === 'text') {
        formData.append('textContent', textContent);
      }

      const res = await api.post(`/commitments/${id}/proof`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setVerificationResult(res.data.verification);
      }
    } catch (err: any) {
      if (err.response?.data?.verification) {
        setVerificationResult(err.response.data.verification);
      } else {
        setError(err.response?.data?.message || 'Proof submission failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="glass-card rounded-3xl p-6 sm:p-8 gradient-border">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black shadow border border-emerald-500/20">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-slate-100">
              Submit Task Completion Proof
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Task: <span className="font-bold text-slate-900 dark:text-slate-200">{commitment?.title}</span>
            </p>
          </div>
        </div>

        {/* Health Disclaimer Note */}
        {commitment?.category === 'Health' && (
          <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-bold">Health Safety Standard:</strong> AI proof verification only determines whether submitted evidence matches configured requirements. AI does not claim or evaluate biological medicine ingestion.
            </p>
          </div>
        )}

        {/* Verification Result Banner */}
        {verificationResult ? (
          <div className={`p-6 rounded-2xl border text-center space-y-4 ${
            verificationResult.verified
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
          }`}>
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-slate-950/80 border border-emerald-500/30">
              {verificationResult.verified ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-10 h-10 text-rose-400" />
              )}
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">
                {verificationResult.verified ? 'Verification Passed! 🎉' : 'Proof Rejected / Review Required'}
              </h3>
              <div className="text-xs font-mono mt-1 text-slate-300">
                Confidence Score: <span className="font-bold text-emerald-400">{Math.round(verificationResult.confidence * 100)}%</span> | Model: {verificationResult.provider}
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800 leading-relaxed text-left">
              💡 <strong>AI Analysis:</strong> {verificationResult.reason}
            </p>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm py-3 rounded-xl shadow-lg transition-all"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Proof Type Tabs */}
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setProofType('image')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  proofType === 'image'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Upload className="w-4 h-4" /> Photo / Screenshot Proof
              </button>
              <button
                type="button"
                onClick={() => setProofType('text')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  proofType === 'text'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" /> Text Summary Proof
              </button>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
                {error}
              </div>
            )}

            {proofType === 'image' ? (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  Upload Evidence Image
                </label>
                
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-6 text-center hover:border-emerald-500/50 transition-colors bg-slate-50 dark:bg-slate-950/50">
                  {filePreview ? (
                    <div className="space-y-3">
                      <img
                        src={filePreview}
                        alt="Proof Preview"
                        className="max-h-56 mx-auto rounded-xl border border-slate-700 object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => { setSelectedFile(null); setFilePreview(''); }}
                        className="text-xs text-rose-500 font-bold hover:underline"
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer space-y-2 block">
                      <Upload className="w-8 h-8 text-emerald-500 mx-auto" />
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        Click to select image or drag and drop
                      </div>
                      <p className="text-[11px] text-slate-400">PNG, JPG, WEBP up to 10MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  Written Completion Summary
                </label>
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  rows={5}
                  placeholder="Describe key work performed, pages read, or task outcome..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Python AI Service Analyzing Proof...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Proof for Python AI Verification</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
