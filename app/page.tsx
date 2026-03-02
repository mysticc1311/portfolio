'use client';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
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
  link: string;
};

// ── data ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 0,
    icon: '🚁',
    title: 'Unsynchronized Stereo Camera Calibration via Moving Drone Trajectory Tracking',
    tech: 'Python · OpenCV',
    desc: 'My Thesis Work. This thesis addresses the problem of estimating the relative pose between two cameras in a static stereo system without requiring temporal synchronization or static calibration patterns. Traditional calibration methods rely on structured targets or distinctive scene features and assume synchronized acquisition, which limits their applicability in uncontrolled environments. We propose a novel calibration method based on a moving drone equipped with a LED light. Instead of exploiting spatial correspondences from static patterns, the method leverages the trajectory of a single luminous point observed by both cameras. The approach compensates for unknown time offsets and frame rate differences and recovers the relative rotation and translation between the cameras. Temporal alignment is achieved using distinctive events such as LED blinking patterns or self-intersections in the trajectories. The method is validated through both simulated and real-world experiments under challenging lighting conditions and in the presence of motion noise. Results demonstrate accurate and stable pose estimation despite temporal misalignment and imperfect drone motion. The proposed approach provides a practical calibration solution for stereo systems operating in environments where traditional marker-based techniques are difficult to deploy.',
    status: 'Completed',
    link: 'https://github.com/mysticc1311/calidrone.git',
  },
  {
    id: 1,
    icon: '🎥',
    title: 'Single Image Camera Calibration using Three Orthogonal ChArUco Boards',
    tech: 'Python · OpenCV',
    desc: 'Made as part of the Image Analysis and Computer Vision course. This projects presents a calibration algorithm capable of performing both intrinsic and extrinsic camera calibration using a single image of a calibration target composed of three orthogonal ChArUco boards, which are a combination of chessboard patterns and ArUco markers. The algorithm is based on Zhang’s calibration method and leverages the orthogonality of the planes and the corners of the boards to estimate the camera parameters. To assess the quality of the algorithm the results are compared with those obtained using the standard OpenCV calibration functions, which rely on multiple images. The purpose of this project is to demonstrate the feasibility of achieving accurate results while reducing the time and effort required for calibration.',
    status: 'Completed',
    link: 'https://github.com/mysticc1311/calibration-custom.git',
  },
  {
    id: 2,
    icon: '📝',
    title: 'Rapportini',
    tech: 'React Native',
    desc: 'The app allows users to create, edit, store, and send short work reports related to on-site client activities (e.g., time spent, type of intervention, operational notes). Data is stored locally on the device in an organized and easily accessible structure. The application also includes an export and email-sending feature directly from within the app. The project was developed with a strong focus on usability, fast data entry, and workflow optimization for field technicians and professionals.',
    status: 'Early Stages',
    link: 'https://github.com/mysticc1311/rapportini.git',
  }
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
  const { t, language, setLanguage } = useLanguage();

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
              <span>💼 Portfolio v1.0</span>
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

              <div style={{ marginLeft: 'auto', marginRight: 8 }}>
                <Button
                  size='sm'
                  active={language === 'en'}
                  onClick={() => setLanguage('en')}
                >
                  ENG
                </Button>
                <Button
                  size='sm'
                  active={language === 'it'}
                  onClick={() => setLanguage('it')}
                >
                  ITA
                </Button>
              </div>

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
                  <div style={{ fontSize: 18, fontWeight: 'bold' }}>{t.hero_title}</div>
                  <div style={{ fontSize: 12, color: '#444' }}>
                    {t.hero_subtitle}
                  </div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>
                    {t.hero_location} &nbsp;|&nbsp; {t.hero_education} @ <a href='https://www.polimi.it'>Polimi</a> &nbsp;
                  </div>
                </div>
              </Frame>

              {/* tabs */}
              <Tabs value={activeTab} onChange={(v) => setActiveTab(v)}>
                <Tab value={0}>{t.tab_about}</Tab>
                <Tab value={1}>{t.tab_projects}</Tab>
                <Tab value={2}>{t.tab_skills}</Tab>
                <Tab value={3}>{t.tab_contact}</Tab>
              </Tabs>

              <TabBody style={{ padding: '16px 8px', minHeight: 340 }}>
                {/* ── ABOUT ── */}
                {activeTab === 0 && (
                  <div>
                    <GroupBox label={t.about_title}>
                      <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                        {t.about_p1}
                      </p>
                      <br />
                      <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                        {t.about_p2}
                      </p>
                    </GroupBox>
                    <br />
                    <GroupBox label={t.about_currently}>
                      <div style={{ fontSize: 13 }}>
                        {t.about_currently_1}
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
                          {t.back_button}
                        </Button>
                        <Window style={{ width: '100%' }}>
                          <WindowHeader style={{ fontSize: 18 }}>
                            {selectedProject.icon} {selectedProject.title}
                          </WindowHeader>
                          <WindowContent>
                            <Frame variant='well' style={{ padding: 12, marginBottom: 12 }}>
                              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7 }}>
                                {selectedProject.desc}
                              </p>
                            </Frame>
                            <div style={{ fontSize: 12 }}>
                              <strong>{t.tech_stack}</strong> {selectedProject.tech}
                              <br />
                              <strong>{t.status}:</strong>{' '}
                              <span
                                style={{
                                  color: selectedProject.status === 'Completed' ? 'green' : 'navy',
                                }}
                              >
                                {selectedProject.status}
                              </span>
                            </div>
                            <br />
                            <Button onClick={() => window.open(selectedProject.link, '_blank')}>{t.view_github}</Button>
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
                            <div style={{ fontWeight: 'bold', fontSize: 13, minHeight: 60 }}>{p.title}</div>
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
                        <div style={{ fontWeight: 'bold' }}>{t.contact_sent_title}</div>
                        <div style={{ fontSize: 12, marginTop: 4 }}>
                           {t.contact_sent_desc}
                        </div>
                        <br />
                        <Button onClick={() => setContactSent(false)}>{t.contact_send_another}</Button>
                      </Frame>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <GroupBox label={t.contact_send_title}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div>
                              <label style={{ fontSize: 12, display: 'block', marginBottom: 3 }}>
                                {t.contact_name_label}
                              </label>
                              <TextField placeholder={t.contact_name_placeholder} style={{ width: '100%' }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 12, display: 'block', marginBottom: 3 }}>
                                {t.contact_email_label}
                              </label>
                              <TextField placeholder={t.contact_email_placeholder} style={{ width: '100%' }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 12, display: 'block', marginBottom: 3 }}>
                                {t.contact_message_label}
                              </label>
                              <TextField
                                placeholder={t.contact_message_placeholder}
                                multiline
                                rows={4}
                                style={{ width: '100%' }}
                              />
                            </div>
                            <Button onClick={() => setContactSent(true)} style={{ alignSelf: 'flex-start' }}>
                              {t.contact_send_button}
                            </Button>
                          </div>
                        </GroupBox>
                        <GroupBox label={t.contact_find_title}>
                          <div style={{ fontSize: 12, lineHeight: 2 }}>
                            📧 &nbsp;pozzi.tia@gmail.com
                            <br />
                            🐙 &nbsp;github.com/mysticc1311
                            <br />
                            💼 &nbsp;linkedin.com/in/mattia-pozzi-3030312a4/
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
            💼 {t.hero_title} - Portfolio
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