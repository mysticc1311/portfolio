'use client';
import { useState } from 'react';
import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Tabs,
  Tab,
  TabBody,
  Hourglass,
  Separator,
  Frame,
  GroupBox,
  ProgressBar,
  Tooltip,
  MenuList,
  MenuListItem,
  Bar,
  Toolbar,
  TextField,
} from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

type Project = {
  id: number;
  icon: string;
  title: string;
  tech: string;
  desc: string;
  status: string;
};

// ── data ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 1,
    icon: '👁️',
    title: 'VisionTrack',
    tech: 'Python · YOLOv8 · OpenCV',
    desc: 'Real-time multi-object tracking system using a custom-trained YOLOv8 model. Achieves 45 FPS on consumer hardware with 94% mAP on the test set.',
    status: 'Completed',
  },
  {
    id: 2,
    icon: '🧠',
    title: 'DepthMapper',
    tech: 'PyTorch · MiDaS · CUDA',
    desc: 'Monocular depth estimation pipeline for autonomous navigation. Benchmarked against KITTI dataset with optimised inference for edge deployment.',
    status: 'Completed',
  },
  {
    id: 3,
    icon: '🔬',
    title: 'CellScan',
    tech: 'Python · U-Net · scikit-image',
    desc: 'Semantic segmentation of microscopy images for cell-count automation. Reduced manual annotation time by 80% in a research lab setting.',
    status: 'In Progress',
  },
  {
    id: 4,
    icon: '📊',
    title: 'DataPulse',
    tech: 'Python · Pandas · FastAPI',
    desc: 'REST API dashboard for real-time sensor data aggregation and anomaly detection, deployed on-prem for an industrial IoT client.',
    status: 'Completed',
  },
];

const SKILLS = [
  { label: 'Python', value: 95 },
  { label: 'Computer Vision', value: 90 },
  { label: 'PyTorch / TensorFlow', value: 85 },
  { label: 'OpenCV', value: 88 },
  { label: 'Data Analysis', value: 80 },
  { label: 'SQL / NoSQL', value: 70 },
  { label: 'Docker / Linux', value: 72 },
  { label: 'React / Next.js', value: 60 },
];

// ── tiny clock ───────────────────────────────────────────────────────────────

function Clock() {
  const [time, setTime] = useState(new Date());
  // update every second
  if (typeof window !== 'undefined') {
    setTimeout(() => setTime(new Date()), 1000);
  }
  return (
    <span style={{ fontFamily: 'ms_sans_serif', fontSize: 12 }}>
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
}

// ── main component ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState(0);
  const [contactSent, setContactSent] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <ThemeProvider theme={original}>
      {/* desktop background */}
      <div
        style={{
          minHeight: '100vh',
          background: '#008080',
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #006666 0%, transparent 50%), radial-gradient(circle at 80% 70%, #004444 0%, transparent 50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '32px 16px 72px',
          fontFamily: 'ms_sans_serif',
        }}
      >
        {/* ── main window ── */}
        {!minimized && (
          <Window
            style={{
              width: '100%',
              maxWidth: 860,
              boxShadow: '4px 4px 0 #000',
            }}
          >
            {/* title bar */}
            <WindowHeader
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>💼 Mattia Pozzi — Portfolio v1.0</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <Button size='sm' square onClick={() => setMinimized(true)}>
                  _
                </Button>
                <Button size='sm' square>
                  □
                </Button>
                <Button size='sm' square>
                  ✕
                </Button>
              </div>
            </WindowHeader>

            {/* menu bar */}
            <Toolbar style={{ paddingLeft: 8 }}>
              {['File', 'Edit', 'View', 'Help'].map((m) => (
                <Button key={m} variant='flat' size='sm' style={{ marginRight: 2 }}>
                  {m}
                </Button>
              ))}
            </Toolbar>

            <Separator />

            <WindowContent style={{ padding: '16px' }}>
              {/* hero strip */}
              <Frame
                variant='well'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '12px 16px',
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: '#000080',
                    border: '2px solid #fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    flexShrink: 0,
                  }}
                >
                  👤
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 'bold' }}>Mattia Pozzi</div>
                  <div style={{ fontSize: 12, color: '#444' }}>
                    Data Scientist &amp; Computer Vision Engineer
                  </div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>
                    📍 Italy &nbsp;|&nbsp; 🎓 Computer Science &nbsp;|&nbsp; 🔬 CV / ML / AI
                  </div>
                </div>
              </Frame>

              {/* tabs */}
              <Tabs value={activeTab} onChange={(v) => setActiveTab(v)}>
                <Tab value={0}>👤 About</Tab>
                <Tab value={1}>🗂️ Projects</Tab>
                <Tab value={2}>⚙️ Skills</Tab>
                <Tab value={3}>📬 Contact</Tab>
              </Tabs>

              <TabBody style={{ padding: '16px 8px', minHeight: 340 }}>
                {/* ── ABOUT ── */}
                {activeTab === 0 && (
                  <div>
                    <GroupBox label='Who am I?'>
                      <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                        Hi! I'm <strong>Mattia Pozzi</strong>, a Data Scientist and Computer Vision
                        engineer based in Italy. I specialise in building intelligent systems that
                        can see, understand, and reason about the visual world — from real-time
                        object detection pipelines to deep learning models for medical imaging.
                      </p>
                      <br />
                      <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                        I'm passionate about bridging the gap between cutting-edge research and
                        real-world applications. When I'm not training models, I enjoy exploring
                        retro computing aesthetics — hence this portfolio 😄
                      </p>
                    </GroupBox>
                    <br />
                    <GroupBox label='Currently'>
                      <div style={{ fontSize: 13 }}>
                        🔭 &nbsp;Working on real-time depth estimation for robotics
                        <br />
                        📖 &nbsp;Reading papers on vision-language models
                        <br />
                        🛠️ &nbsp;Building open-source CV tools
                      </div>
                    </GroupBox>
                  </div>
                )}

                {/* ── PROJECTS ── */}
                {activeTab === 1 && (
                  <div>
                    {selectedProject ? (
                      <div>
                        <Button
                          size='sm'
                          onClick={() => setSelectedProject(null)}
                          style={{ marginBottom: 12 }}
                        >
                          ← Back
                        </Button>
                        <Window style={{ width: '100%' }}>
                          <WindowHeader>
                            {selectedProject.icon} {selectedProject.title}
                          </WindowHeader>
                          <WindowContent>
                            <Frame variant='well' style={{ padding: 12, marginBottom: 12 }}>
                              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7 }}>
                                {selectedProject.desc}
                              </p>
                            </Frame>
                            <div style={{ fontSize: 12 }}>
                              <strong>Tech stack:</strong> {selectedProject.tech}
                              <br />
                              <strong>Status:</strong>{' '}
                              <span
                                style={{
                                  color: selectedProject.status === 'Completed' ? 'green' : 'navy',
                                }}
                              >
                                {selectedProject.status}
                              </span>
                            </div>
                            <br />
                            <Button>🔗 View on GitHub</Button>
                          </WindowContent>
                        </Window>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                          gap: 12,
                        }}
                      >
                        {PROJECTS.map((p) => (
                          <Button
                            key={p.id}
                            onClick={() => setSelectedProject(p)}
                            style={{
                              height: 'auto',
                              padding: '12px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              gap: 6,
                              textAlign: 'left',
                              cursor: 'pointer',
                            }}
                          >
                            <div style={{ fontSize: 24 }}>{p.icon}</div>
                            <div style={{ fontWeight: 'bold', fontSize: 13 }}>{p.title}</div>
                            <div style={{ fontSize: 10, color: '#555' }}>{p.tech}</div>
                            <div
                              style={{
                                fontSize: 10,
                                color: p.status === 'Completed' ? 'green' : 'navy',
                              }}
                            >
                              ● {p.status}
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ── SKILLS ── */}
                {activeTab === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {SKILLS.map((s) => (
                      <div key={s.label}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: 12,
                            marginBottom: 3,
                          }}
                        >
                          <span>{s.label}</span>
                          <span>{s.value}%</span>
                        </div>
                        <ProgressBar value={s.value} />
                      </div>
                    ))}
                  </div>
                )}

                {/* ── CONTACT ── */}
                {activeTab === 3 && (
                  <div>
                    {contactSent ? (
                      <Frame
                        variant='well'
                        style={{ padding: 24, textAlign: 'center' }}
                      >
                        <div style={{ fontSize: 32, marginBottom: 8 }}>📨</div>
                        <div style={{ fontWeight: 'bold' }}>Message sent!</div>
                        <div style={{ fontSize: 12, marginTop: 4 }}>
                          Thanks for reaching out. I'll get back to you soon.
                        </div>
                        <br />
                        <Button onClick={() => setContactSent(false)}>Send another</Button>
                      </Frame>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <GroupBox label='Send a message'>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div>
                              <label style={{ fontSize: 12, display: 'block', marginBottom: 3 }}>
                                Your name
                              </label>
                              <TextField placeholder='John Doe' style={{ width: '100%' }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 12, display: 'block', marginBottom: 3 }}>
                                Email
                              </label>
                              <TextField placeholder='john@example.com' style={{ width: '100%' }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 12, display: 'block', marginBottom: 3 }}>
                                Message
                              </label>
                              <TextField
                                placeholder='Hi Mattia, I wanted to...'
                                multiline
                                rows={4}
                                style={{ width: '100%' }}
                              />
                            </div>
                            <Button onClick={() => setContactSent(true)} style={{ alignSelf: 'flex-start' }}>
                              📤 Send
                            </Button>
                          </div>
                        </GroupBox>
                        <GroupBox label='Or find me at'>
                          <div style={{ fontSize: 12, lineHeight: 2 }}>
                            📧 &nbsp;mattia@example.com
                            <br />
                            🐙 &nbsp;github.com/mattiapozzi
                            <br />
                            💼 &nbsp;linkedin.com/in/mattiapozzi
                          </div>
                        </GroupBox>
                      </div>
                    )}
                  </div>
                )}
              </TabBody>
            </WindowContent>
          </Window>
        )}

        {/* ── taskbar ── */}
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            background: '#c0c0c0',
            borderTop: '2px solid #fff',
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            gap: 8,
            zIndex: 999,
          }}
        >
          <Button
            active={!minimized}
            onClick={() => setMinimized(false)}
            style={{ height: 28, fontSize: 12 }}
          >
            💼 Mattia Pozzi — Portfolio
          </Button>
          <div style={{ flex: 1 }} />
          <Frame
            variant='well'
            style={{
              padding: '2px 10px',
              height: 28,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Clock />
          </Frame>
        </div>
      </div>
    </ThemeProvider>
  );
}