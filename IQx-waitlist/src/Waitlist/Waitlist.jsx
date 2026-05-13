import React, { useEffect, useState } from "react";
import styles from "./Waitlist.module.css";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const mobileSlideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] }
  })
};

// --- Helper Components Moved Outside to Prevent Re-creation on Render ---

const IntroContent = ({ isMobileView, waitlistCount, navigateToForm, slideDirection }) => {
  const keywords = ["Intelligence", "Audits", "Reporting", "Workflows"];

  return (
    <motion.section
      className={isMobileView ? styles.mobileCard : styles.heroPanel}
      variants={isMobileView ? mobileSlideVariants : containerVariants}
      initial={isMobileView ? "enter" : "hidden"}
      animate={isMobileView ? "center" : "visible"}
      exit={isMobileView ? "exit" : undefined}
      custom={slideDirection}
      key="intro"
    >
      <motion.header className={styles.header} variants={itemVariants}>
        <div className={styles.brandLockup}>
          <img src="/Images/icons/iqx_logo_white.png" alt="InteleQX" className={styles.brandLogo} />
        </div>
        <div className={styles.statusBadge}>
          <span className={styles.livePulse}></span>
          <span className={styles.waitlistCount}>{waitlistCount.toLocaleString()}+ joined</span>
        </div>
        <span className={styles.eyebrow}>WAITLIST NOW OPEN</span>
      </motion.header>

      <motion.h1 className={styles.title} variants={itemVariants}>
        Access the InteleQX Portal
      </motion.h1>

      <motion.p className={styles.heroCopy} variants={itemVariants}>
        Intelligence, audits, reporting, and workflows in one secure environment.
      </motion.p>

      <motion.div className={styles.keywordRail} variants={itemVariants}>
        {keywords.map((word, i) => (
          isMobileView ? (
            <span key={i} className={styles.keywordPill}>
              {word}
            </span>
          ) : (
            <motion.span
              key={i}
              className={styles.keywordPill}
              animate={{
                y: [0, -2, 0],
                opacity: [0.88, 1, 0.88]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.45
              }}
            >
              {word}
            </motion.span>
          )
        ))}
      </motion.div>

      {!isMobileView && (
        <div className={styles.moduleSection}>
          <motion.div className={styles.sectionLabel} variants={itemVariants}>Platform modules</motion.div>
          <motion.div className={styles.featureGrid} variants={itemVariants}>
            {[
              { icon: "intelligence", label: "Intelligence Suite" },
              { icon: "audit", label: "Audits & Checklists" },
              { icon: "actions", label: "Corrective Actions" },
              { icon: "platform", label: "Reporting Layer" }
            ].map((feature, i) => (
              <div key={i} className={styles.featureCard}>
                <img src={`/Images/icons/${feature.icon}.svg`} alt="" className={styles.featureIcon} />
                <span>{feature.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {isMobileView && (
        <motion.div className={styles.mobileCtaWrapper} variants={itemVariants}>
          <button
            className={styles.mobilePrimaryButton}
            onClick={navigateToForm}
            aria-label="Open request access form"
          >
            Request access <span className={styles.arrow}>→</span>
          </button>
          <p className={styles.mobileCtaHint}>Takes less than 30 seconds.</p>
        </motion.div>
      )}

      {!isMobileView && (
        <motion.div className={styles.brandStatement} variants={itemVariants}>
          <p className={styles.brandStatementTitle}>Quality | Performance | Intelligence</p>
        </motion.div>
      )}
    </motion.section>
  );
};

const FormContent = ({
  isMobileView,
  slideDirection,
  navigateToIntro,
  submitted,
  handleSubmit,
  fullName, setFullName,
  workEmail, setWorkEmail,
  companyName, setCompanyName,
  role, setRole,
  numberOfProperties, setNumberOfProperties,
  mainAreaOfInterest, setMainAreaOfInterest,
  qualityChallenge, setQualityChallenge,
  isFormValid, loading, message
}) => (
  <motion.section
    className={isMobileView ? styles.mobileCard : styles.formPanel}
    variants={isMobileView ? mobileSlideVariants : undefined}
    initial={isMobileView ? "enter" : { x: -100, opacity: 0, zIndex: -1 }}
    animate={isMobileView ? "center" : { x: 0, opacity: 1, zIndex: 1 }}
    exit={isMobileView ? "exit" : undefined}
    custom={slideDirection}
    transition={isMobileView ? undefined : { duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    key="form"
  >
    <div className={isMobileView ? styles.mobileFormCard : styles.premiumCard}>
      {isMobileView && (
        <button
          type="button"
          className={styles.backButton}
          onClick={navigateToIntro}
          aria-label="Back to overview"
        >
          ← Back to overview
        </button>
      )}
      {!submitted ? (
        <>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Request access</h2>
            <p className={styles.formSubtitle}>Join the waitlist for the InteleQX Portal.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.formElement}>
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label htmlFor="fullName" className={styles.label}>Full name <span className={styles.required}>*</span></label>
                <input id="fullName" type="text" className={styles.inputField} placeholder="James Wilson" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className={styles.field}>
                <label htmlFor="workEmail" className={styles.label}>Work email <span className={styles.required}>*</span></label>
                <input id="workEmail" type="email" className={styles.inputField} placeholder="james@company.com" value={workEmail} onChange={(e) => setWorkEmail(e.target.value)} required />
              </div>
              <div className={styles.field}>
                <label htmlFor="companyName" className={styles.label}>Company / Group <span className={styles.required}>*</span></label>
                <input id="companyName" type="text" className={styles.inputField} placeholder="Entity name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
              </div>
              <div className={styles.field}>
                <label htmlFor="role" className={styles.label}>Role</label>
                <input id="role" type="text" className={styles.inputField} placeholder="Director" value={role} onChange={(e) => setRole(e.target.value)} />
              </div>
              <div className={styles.field}>
                <label htmlFor="properties" className={styles.label}>Properties</label>
                <input id="properties" type="number" className={styles.inputField} placeholder="Count" value={numberOfProperties} onChange={(e) => setNumberOfProperties(e.target.value)} />
              </div>
              <div className={styles.field}>
                <label htmlFor="interest" className={styles.label}>Interest</label>
                <select id="interest" className={styles.selectField} value={mainAreaOfInterest} onChange={(e) => setMainAreaOfInterest(e.target.value)}>
                  <option value="">Select area</option>
                  <option value="Intelligence Suite">Intelligence Suite</option>
                  <option value="Complaints Management">Complaints Management</option>
                  <option value="Audits & Checklists">Audits & Checklists</option>
                  <option value="Corrective Actions">Corrective Actions</option>
                  <option value="Reporting Layer">Reporting Layer</option>
                  <option value="Full InteleQX Portal">Full InteleQX Portal</option>
                </select>
              </div>
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label htmlFor="challenge" className={styles.label}>Challenge</label>
                <textarea id="challenge" className={styles.textareaField} placeholder="What are you trying to solve?" value={qualityChallenge} onChange={(e) => setQualityChallenge(e.target.value)} rows="2"></textarea>
              </div>
            </div>
            <button type="submit" className={styles.submitButton} disabled={!isFormValid || loading}>{loading ? "Submitting..." : "Request access"}</button>
            <div className={styles.message} aria-live="polite">
              {message && <p className={message.includes("Successfully") ? styles.successMessage : styles.errorMessage}>{message}</p>}
            </div>
          </form>
          <footer className={styles.poweredBy}>Powered by InteleQX™</footer>
        </>
      ) : (
        <motion.div className={styles.successBadge} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className={styles.checkCircle}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 className={styles.formTitle}>You’re on the list.</h2>
          <p className={styles.formSubtitle}>We’ll contact you when access opens.</p>
          <footer className={styles.poweredBy}>Powered by InteleQX™</footer>
        </motion.div>
      )}
    </div>
  </motion.section>
);

const Waitlist = () => {
  // Navigation States
  const [isMobile, setIsMobile] = useState(false);
  const [mobileStep, setMobileStep] = useState("intro");
  const [slideDirection, setSlideDirection] = useState(1);

  // Form States
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [numberOfProperties, setNumberOfProperties] = useState("");
  const [mainAreaOfInterest, setMainAreaOfInterest] = useState("");
  const [qualityChallenge, setQualityChallenge] = useState("");

  // Logic States
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(284);

  // Validation States
  const [isValidFullName, setIsValidFullName] = useState(false);
  const [isValidWorkEmail, setIsValidWorkEmail] = useState(false);
  const [isValidCompanyName, setIsValidCompanyName] = useState(false);
  const [isValidRole, setIsValidRole] = useState(true);
  const [isValidNumberOfProperties, setIsValidNumberOfProperties] = useState(true);
  const [isValidQualityChallenge, setIsValidQualityChallenge] = useState(true);

  const WAITLIST_ENDPOINT = "https://iqxbackend-648711352735.europe-west3.run.app" || "http://localhost:3000/api/waitlist";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 820);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView");
    }

    const interval = setInterval(() => {
      setWaitlistCount(prev => prev + (Math.random() > 0.85 ? 1 : 0));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nameRegex = /^[a-zA-Z\s.'-]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const personalEmailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com", "proton.me", "protonmail.com"];

    const isNameValid = nameRegex.test(fullName);
    const isEmailValid = emailRegex.test(workEmail);
    const isBusinessEmail = isEmailValid && !personalEmailDomains.some(domain => workEmail.toLowerCase().endsWith(domain));
    const isCompanyValid = companyName.length >= 2;
    const isRoleValid = role.length === 0 || role.length >= 2;
    const isPropertiesValid = numberOfProperties.length === 0 || (Number(numberOfProperties) >= 1 && Number(numberOfProperties) <= 10000);
    const isChallengeValid = qualityChallenge.length <= 500;

    setIsValidFullName(isNameValid);
    setIsValidWorkEmail(isBusinessEmail);
    setIsValidCompanyName(isCompanyValid);
    setIsValidRole(isRoleValid);
    setIsValidNumberOfProperties(isPropertiesValid);
    setIsValidQualityChallenge(isChallengeValid);

    if (fullName.length > 0 && !isNameValid) setMessage("Full name must be at least 2 characters.");
    else if (workEmail.length > 0 && !isEmailValid) setMessage("Please enter a valid work email address.");
    else if (workEmail.length > 0 && !isBusinessEmail) setMessage("Please use a business or entity email address.");
    else if (companyName.length > 0 && !isCompanyValid) setMessage("Company name must be at least 2 characters.");
    else setMessage("");
  }, [fullName, workEmail, companyName, role, numberOfProperties, qualityChallenge]);

  const addToWaitlist = async () => {
    setLoading(true);
    try {
      const payload = { fullName, workEmail, companyName, role, numberOfProperties: numberOfProperties ? Number(numberOfProperties) : null, mainAreaOfInterest, qualityChallenge };
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 409) {
        setMessage("This email is already on the InteleQX waitlist.");
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error("Submission failed");
      if (window.fbq) window.fbq("track", "Lead");
      setSubmitted(true);
    } catch (error) {
      console.error("Waitlist error:", error);
      if (WAITLIST_ENDPOINT.includes("localhost") || !import.meta.env.VITE_INTELEQX_WAITLIST_ENDPOINT) {
        setTimeout(() => {
          if (window.fbq) window.fbq("track", "Lead");
          setSubmitted(true);
          setLoading(false);
        }, 1500);
        return;
      }
      setMessage("Submission failed. Please try again.");
    } finally {
      if (!WAITLIST_ENDPOINT.includes("localhost")) setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) addToWaitlist();
  };

  const isFormValid = isValidFullName && isValidWorkEmail && isValidCompanyName && isValidRole && isValidNumberOfProperties && isValidQualityChallenge;

  const navigateToForm = () => {
    setSlideDirection(1);
    setMobileStep("form");
  };

  const navigateToIntro = () => {
    setSlideDirection(-1);
    setMobileStep("intro");
  };

  const commonProps = {
    fullName, setFullName,
    workEmail, setWorkEmail,
    companyName, setCompanyName,
    role, setRole,
    numberOfProperties, setNumberOfProperties,
    mainAreaOfInterest, setMainAreaOfInterest,
    qualityChallenge, setQualityChallenge,
    isFormValid, loading, message, submitted, handleSubmit
  };

  return (
    <div className={styles.waitlistContainer}>
      <div className={styles.ambientLayer} aria-hidden="true">
        <div className={`${styles.orb} ${styles.orbOne}`}></div>
        <div className={`${styles.orb} ${styles.orbTwo}`}></div>
        <div className={styles.gridOverlay}></div>
      </div>

      <main className={styles.contentGrid}>
        {!isMobile ? (
          <div className={styles.integratedPanel}>
            <IntroContent
              isMobileView={false}
              waitlistCount={waitlistCount}
              navigateToForm={navigateToForm}
              slideDirection={slideDirection}
            />
            <FormContent
              isMobileView={false}
              slideDirection={slideDirection}
              navigateToIntro={navigateToIntro}
              {...commonProps}
            />
          </div>
        ) : (
          <div className={styles.mobileSliderContainer}>
            <AnimatePresence mode="wait" custom={slideDirection}>
              {mobileStep === "intro" ? (
                <IntroContent
                  isMobileView={true}
                  waitlistCount={waitlistCount}
                  navigateToForm={navigateToForm}
                  slideDirection={slideDirection}
                />
              ) : (
                <FormContent
                  isMobileView={true}
                  slideDirection={slideDirection}
                  navigateToIntro={navigateToIntro}
                  {...commonProps}
                />
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default Waitlist;
