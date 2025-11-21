import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Github, Linkedin, Mail, Link as LinkIcon, ExternalLink, Search } from 'lucide-react'
import Spline from '@splinetool/react-spline'
import { apiGet, ensureSeeded, API_BASE } from './lib/api'
import './index.css'

function useDarkMode() {
  const [dark, setDark] = useState(() => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  return [dark, setDark]
}

function Navbar() {
  const [dark, setDark] = useDarkMode()
  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/team', label: 'Team' },
    { to: '/contact', label: 'Contact' },
  ]
  const location = useLocation()
  return (
    <div className="fixed top-0 inset-x-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight text-slate-900 dark:text-white">My Portfolio</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`hover:text-blue-600 transition-colors ${location.pathname===l.to? 'text-blue-600 font-medium': 'text-slate-700 dark:text-slate-300'}`}>{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => setDark(!dark)} aria-label="Toggle theme" className="p-2 rounded-lg border border-black/5 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800">
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
        </div>
      </div>
    </div>
  )
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="pt-20">{children}</main>
      <footer className="mt-16 py-10 border-t border-black/5 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm opacity-70">© {new Date().getFullYear()} Your Name. All rights reserved.</div>
      </footer>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center min-h-[70vh] px-4 sm:px-6 lg:px-8">
        <div className="py-10">
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">Your Name
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Full-Stack Developer</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-prose">I craft fast, accessible web experiences with React, FastAPI, and delightful interactions. Explore my work and team below.</motion.p>
          <div className="mt-6 flex gap-3">
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 shadow hover:shadow-lg transition-shadow">View Projects <ExternalLink size={16}/></Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">Contact</Link>
          </div>
        </div>
        <div className="h-[420px] md:h-[520px] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-slate-900">
          <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">I'm a developer who enjoys building polished products end-to-end. My focus is on performance, accessibility, and maintainable systems. I work with React, Tailwind, FastAPI, and MongoDB.</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {['React','FastAPI','Tailwind','MongoDB','TypeScript','Framer Motion'].map(s => (
              <div key={s} className="rounded-xl border border-black/10 dark:border-white/10 p-4 hover:-translate-y-0.5 transition shadow-sm bg-white/60 dark:bg-slate-900/40 backdrop-blur">
                <div className="font-medium">{s}</div>
                <div className="text-sm opacity-70">Experienced</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900/40 shadow-sm">
          <h3 className="font-semibold">Highlights</h3>
          <ul className="mt-3 text-sm space-y-2 opacity-80 list-disc list-inside">
            <li>5+ years building web apps</li>
            <li>Shipped SaaS used by thousands</li>
            <li>Open-source contributor</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({p}) {
  return (
    <Link to={`/projects/${p.slug}`} className="group rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-white dark:bg-slate-900 hover:shadow-xl transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img src={(p.images && p.images[0]) || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
      </div>
      <div className="p-4">
        <div className="font-semibold tracking-tight">{p.title}</div>
        <div className="text-sm opacity-70 line-clamp-2">{p.description}</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.technologies?.slice(0,4).map(t => <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-black/5 dark:border-white/10">{t}</span>)}
        </div>
      </div>
    </Link>
  )
}

function Projects() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [tech, setTech] = useState('')

  useEffect(() => {
    (async () => {
      await ensureSeeded()
      const data = await apiGet(`/api/projects${buildQuery({q, tech})}`)
      setItems(data)
    })()
  }, [q, tech])

  function buildQuery(obj) {
    const params = new URLSearchParams()
    if (obj.q) params.set('q', obj.q)
    if (obj.tech) params.set('tech', obj.tech)
    const str = params.toString()
    return str ? `?${str}` : ''
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search projects" className="w-full pl-10 pr-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900"/>
        </div>
        <select value={tech} onChange={e=>setTech(e.target.value)} className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900">
          <option value="">All Tech</option>
          {['React','FastAPI','MongoDB','Tailwind','Framer Motion','Vite'].map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </section>
  )
}

function ProjectDetail() {
  const { slug } = useParams()
  const [p, setP] = useState(null)
  useEffect(() => { (async () => setP(await apiGet(`/api/projects/${slug}`)))() }, [slug])
  if (!p) return <div className="max-w-7xl mx-auto px-4">Loading...</div>
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-video rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
            <img src={(p.images && p.images[0]) || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80'} alt={p.title} className="w-full h-full object-cover"/>
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">{p.title}</h1>
          <p className="mt-2 opacity-80 leading-relaxed">{p.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.technologies?.map(t => <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-black/5 dark:border-white/10">{t}</span>)}
          </div>
          <div className="mt-6 flex gap-3">
            {p.demo_url && <a href={p.demo_url} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white"><ExternalLink size={16}/> Live Demo</a>}
            {p.repo_url && <a href={p.repo_url} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-black/10 dark:border-white/10"><Github size={16}/> Repository</a>}
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
            <div className="font-semibold">Timeline</div>
            <div className="opacity-80 text-sm mt-1">{p.timeline || '—'}</div>
          </div>
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-5">
            <div className="font-semibold mb-3">Team</div>
            <div className="flex flex-wrap gap-3">
              {p.team_members?.map(slug => (
                <Link key={slug} to={`/team/${slug}`} className="px-3 py-1.5 rounded-full text-sm border border-black/10 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-900">{slug}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MemberCard({m}) {
  return (
    <Link to={`/team/${m.slug}`} className="group rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-white dark:bg-slate-900 hover:shadow-xl transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img src={m.photo || 'https://images.unsplash.com/photo-1541534401786-2077eed87a56?w=800&q=80'} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
      </div>
      <div className="p-4">
        <div className="font-semibold tracking-tight">{m.name}</div>
        <div className="text-sm opacity-70">{m.role}</div>
        <div className="mt-2 text-sm opacity-70 line-clamp-2">{m.bio}</div>
      </div>
    </Link>
  )
}

function Team() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [skill, setSkill] = useState('')
  useEffect(() => {
    (async () => {
      await ensureSeeded()
      const data = await apiGet(`/api/team${buildQuery({q, skill})}`)
      setItems(data)
    })()
  }, [q, skill])

  function buildQuery(obj) {
    const params = new URLSearchParams()
    if (obj.q) params.set('q', obj.q)
    if (obj.skill) params.set('skill', obj.skill)
    const str = params.toString()
    return str ? `?${str}` : ''
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search team" className="w-full pl-10 pr-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900"/>
        </div>
        <select value={skill} onChange={e=>setSkill(e.target.value)} className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900">
          <option value="">All Skills</option>
          {['React','FastAPI','MongoDB','Tailwind','Design'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(m => <MemberCard key={m.slug} m={m} />)}
      </div>
    </section>
  )
}

function MemberDetail() {
  const { slug } = useParams()
  const [m, setM] = useState(null)
  useEffect(() => { (async () => setM(await apiGet(`/api/team/${slug}`)))() }, [slug])
  if (!m) return <div className="max-w-7xl mx-auto px-4">Loading...</div>
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <img src={m.photo || 'https://images.unsplash.com/photo-1541534401786-2077eed87a56?w=400&q=80'} alt={m.name} className="w-20 h-20 rounded-full object-cover border border-black/10 dark:border-white/10"/>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{m.name}</h1>
              <div className="opacity-80">{m.role}</div>
            </div>
          </div>
          <p className="opacity-80 leading-relaxed">{m.bio}</p>
          <div className="flex flex-wrap gap-2">
            {m.skills?.map(s => <span key={s} className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-black/5 dark:border-white/10">{s}</span>)}
          </div>
          <div>
            <div className="font-semibold mb-2">Projects</div>
            <div className="flex flex-wrap gap-2">
              {m.projects?.map(slug => <Link key={slug} to={`/projects/${slug}`} className="px-3 py-1.5 rounded-full text-sm border border-black/10 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-900">{slug}</Link>)}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {m.email && <a href={`mailto:${m.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg w-full border border-black/10 dark:border-white/10"><Mail size={16}/> {m.email}</a>}
          <div className="grid grid-cols-2 gap-3">
            {m.socials?.linkedin && <a href={m.socials.linkedin} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-black/10 dark:border-white/10"><Linkedin size={16}/> LinkedIn</a>}
            {m.socials?.github && <a href={m.socials.github} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-black/10 dark:border-white/10"><Github size={16}/> GitHub</a>}
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight">Get in touch</h2>
      <p className="mt-2 opacity-80">I'm open to freelance opportunities, collaborations, and interesting conversations.</p>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <a href="mailto:you@example.com" className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 p-4 hover:bg-slate-50 dark:hover:bg-slate-900"><Mail size={18}/> you@example.com</a>
        <a href="https://github.com/your" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 p-4 hover:bg-slate-50 dark:hover:bg-slate-900"><Github size={18}/> GitHub</a>
        <a href="https://linkedin.com/in/your" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 p-4 hover:bg-slate-50 dark:hover:bg-slate-900"><Linkedin size={18}/> LinkedIn</a>
        <a href="https://your-website.com" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 p-4 hover:bg-slate-50 dark:hover:bg-slate-900"><LinkIcon size={18}/> Website</a>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <div className="mt-16 space-y-16">
        <About />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold tracking-tight">Featured Projects</h2>
            <Link to="/projects" className="text-sm text-blue-600">View all</Link>
          </div>
          <Projects />
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold tracking-tight">Team Members</h2>
            <Link to="/team" className="text-sm text-blue-600">View all</Link>
          </div>
          <Team />
        </section>
      </div>
    </>
  )
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/:slug" element={<MemberDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRouter
