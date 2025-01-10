'use client';

import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface FormData {
  company: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  sector: string;
  description: string;
  problems: string;
  innovation: string;
}

type FormErrors = {
  [K in keyof FormData]: string;
};

export default function Home() {
  const [formSent, setFormSent] = useState(false)
  const [returnedData, setReturnedData] = useState(null)
  const [error, setError] = useState<string>('')
  const [formData, setFormData] = useState<FormData>({
    company: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    sector: '',
    description: '',
    problems: '',
    innovation: ''
  });

  const [errors, setErrors] = useState<FormErrors>({
    company: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    sector: '',
    description: '',
    problems: '',
    innovation: ''
  });

  function validateForm() {
    const newErrors: FormErrors = { ...errors };

    // Reset all errors
    Object.keys(newErrors).forEach((key) => {
      newErrors[key as keyof FormErrors] = '';
    });

    if (!formData.company.trim()) newErrors.company = 'Nome da empresa é obrigatório';
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório.';
    if (!formData.role.trim()) newErrors.role = 'Cargo é obrigatório.';
    if (!formData.sector.trim()) newErrors.sector = 'Setor é obrigatório.';
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório.';
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória.';

    // Phone validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Formato de telefone inválido';
    }

    // Description length validation
    if (formData.description.length > 300) {
      newErrors.description = 'A descrição deve ter no máximo 300 caracteres';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    
    // Type assertion to ensure name is a valid key of FormData
    const fieldName = name as keyof FormData;
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setFormSent(true);
    setError('');
    try {
      const response = await fetch('https://nero-bot-dev.up.railway.app/extract_solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          empresa: formData.company,
          nome: formData.name,
          email: formData.email,
          telefone: formData.phone,
          cargo: formData.role,
          setor: formData.sector,
          descricao_empresa: formData.description,
          dores: formData.problems,
          areas: formData.innovation
        })
      })

      if (!response.ok) {
        setError('Erro ao enviar formulário. Por favor, tente novamente.')
        setFormSent(false)
        return
      }

      const data = await response.json()
      console.log(data.content)
      setReturnedData(data.content)
      setFormSent(false)

      setFormData({
        company: '',
        name: '',
        email: '',
        phone: '',
        role: '',
        sector: '',
        description: '',
        problems: '',
        innovation: ''
      })

    } catch (error) {
      console.error('Error submitting form:', error)
      setError('Erro ao enviar formulário. Por favor, tente novamente.')
      setFormSent(false)
    }
  }

  return (
    <div className="relative isolate bg-black min-h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-12 pt-24 sm:pt-24 lg:static lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="100%" y={-1} className="overflow-visible fill-gray-800/20">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)" width="100%" height="100%" strokeWidth={0} />
              </svg>
              <div
                aria-hidden="true"
                className="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
              >
                <div
                  style={{
                    clipPath:
                      'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                  }}
                  className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-primary opacity-20"
                />
              </div>
            </div>
            <h2 className="text-pretty text-4xl font-semibold tracking-tight bg-gradient-to-r from-gray-200 to-gray-500 inline-block text-transparent bg-clip-text sm:text-5xl">NeroBot</h2>
            <h4 className='text-white opacity-60 text-2xl sm:text-1xl mt-2'>Descubra o que a inteligência artificial pode fazer por você.</h4>
            <p className="mt-6 text-lg/8 text-gray-300">
            Preencha o formulário abaixo para que possamos entender suas necessidades e sugerir as melhores soluções.
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-gray-300">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  <a href="mailto:equipe@neroai.com.br" className="hover:text-white">
                    equipe@neroai.com.br
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-6 pb-12 pt-24 sm:pb-12 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="block text-sm/6 font-semibold text-white">
                  Nome da empresa *
                </label>
                <div className="mt-2.5">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder='Google'
                    value={formData.company}
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-sm min-h-12 text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primaryDark"
                  />
                  {errors['company'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['company']}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="role" className="block text-sm/6 font-semibold text-white">
                  Cargo *
                </label>
                <div className="mt-2.5">
                  <input
                    id="role"
                    name="role"
                    type="text"
                    placeholder='Gerente de inovação'
                    value={formData.role}
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-sm min-h-12 text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primaryDark"
                  />
                  {errors['role'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['role']}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm/6 font-semibold text-white">
                  Telefone *
                </label>
                <div className="mt-2.5">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder='+55 11 99999-9999'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-sm min-h-12 text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primaryDark"
                  />
                  {errors['phone'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['phone']}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="sector" className="block text-sm/6 font-semibold text-white">
                  Setor da empresa *
                </label>
                <div className="mt-2.5">
                  <input
                    id="sector"
                    name="sector"
                    type="text"
                    placeholder='Tecnologia'
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-sm min-h-12 text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primaryDark"
                  />
                  {errors['sector'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['sector']}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="name" className="block text-sm/6 font-semibold text-white">
                  Seu nome *
                </label>
                <div className="mt-2.5">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder='John Doe'
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-sm min-h-12 text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primaryDark"
                  />
                  {errors['name'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['name']}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm/6 font-semibold text-white">
                  Breve descrição da empresa *
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="description"
                    name="description"
                    placeholder='Descreva em até 300 caracteres'
                    value={formData.description}
                    onChange={handleInputChange}
                    className="resize-none block w-full min-h-32 rounded-md bg-white/5 px-3.5 py-2 text-sm text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primaryDark"
                  />
                  {errors['description'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['description']}</p>
                  )}
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="problems" className="block text-sm/6 font-semibold text-white">
                  Quais são as dores que gostaria de resolver?
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="problems"
                      name="problems"
                      placeholder='Ex: Reduzir custos operacionais, melhorar a experiência do cliente, etc.'
                      value={formData.problems}
                      onChange={handleInputChange}
                      className="resize-none min-h-32 block w-full rounded-md bg-white/5 px-3.5 py-2 text-sm text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primaryDark"
                    />
                    {errors['problems'] && (
                      <p className="mt-1 text-sm text-red-500">{errors['problems']}</p>
                    )}
                  </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="innovation" className="block text-sm/6 font-semibold text-white">
                Quais são as principais áreas da empresa que precisam de inovação?
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="innovation"
                      name="innovation"
                      placeholder='Ex: Vendas, Atendimento ao Cliente, Marketing, etc.'
                      value={formData.innovation}
                      onChange={handleInputChange}
                      className="resize-none min-h-32 block w-full rounded-md bg-white/5 px-3.5 py-2 text-sm text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primaryDark"
                    />
                    {errors['innovation'] && (
                      <p className="mt-1 text-sm text-red-500">{errors['innovation']}</p>
                    )}
                  </div>
              </div>
            </div>

            {returnedData && (
              <Alert className="my-8 bg-gray-900 text-white border-none outline outline-1 -outline-offset-1 outline-white/10">
                <AlertDescription>
                  <Markdown rehypePlugins={[rehypeRaw]}
                            remarkPlugins={[remarkGfm]}>
                            {returnedData}
                  </Markdown>
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="mt-8" variant="destructive">
                <AlertDescription className="whitespace-pre-wrap">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={formSent}
                className="rounded-md bg-primaryDark px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary hover:scale-105 transition-all duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-primaryDark"
              >
                {formSent ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Aguardando resposta...</span>
                  </div>
                ) : (
                  returnedData ? 'Reenviar' : 'Enviar'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
