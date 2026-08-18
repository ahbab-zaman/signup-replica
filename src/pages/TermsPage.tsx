import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TermsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Terms & Conditions | Extroverts";
    window.scrollTo(0, 0);
  }, []);

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 md:px-12 md:py-16 selection:bg-purple-900/50">
      <div className="mx-auto max-w-2xl space-y-12">
        {/* Back navigation link */}
        <div>
          <a
            href="/"
            onClick={handleBack}
            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            ← Back
          </a>
        </div>

        {/* Page Header */}
        <header className="space-y-3">
          <h1 className="font-mono text-3xl sm:text-4xl md:text-[2.6rem] font-bold tracking-tight text-white uppercase">
            TERMS &amp; CONDITIONS
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Last updated August 18, 2026
          </p>
        </header>

        {/* Terms Content Sections */}
        <div className="space-y-10">
          <section className="space-y-3">
            <h2 className="font-mono text-lg sm:text-xl font-bold text-white tracking-wide">
              Acceptance of Terms
            </h2>
            <p className="text-gray-300 leading-relaxed text-base">
              By downloading, installing, or using Extroverts, you agree to these Terms and Conditions. If you do not agree, please do not use the app. We may update these terms from time to time, and continued use of the app after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-lg sm:text-xl font-bold text-white tracking-wide">
              Eligibility
            </h2>
            <p className="text-gray-300 leading-relaxed text-base">
              You must be at least 18 years old to use Extroverts. By using the app, you represent and warrant that you meet this age requirement. Extroverts is designed for adults to discover and attend real-world social events safely and responsibly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-lg sm:text-xl font-bold text-white tracking-wide">
              User Conduct
            </h2>
            <p className="text-gray-300 leading-relaxed text-base">
              You agree to use Extroverts respectfully and lawfully. Harassment, hate speech, impersonation, spamming, or any behavior that makes other users feel unsafe is strictly prohibited. Extroverts reserves the right to suspend or terminate accounts that violate these standards, without prior notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-lg sm:text-xl font-bold text-white tracking-wide">
              Events &amp; Meetups
            </h2>
            <p className="text-gray-300 leading-relaxed text-base">
              Extroverts connects users with events hosted by third-party organizers. We do not own, operate, or control any events listed on the platform. Attendance is at your own risk. We encourage users to exercise caution, follow local laws, and look out for one another when attending in-person gatherings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-lg sm:text-xl font-bold text-white tracking-wide">
              Intellectual Property
            </h2>
            <p className="text-gray-300 leading-relaxed text-base">
              All content, trademarks, logos, and intellectual property within the Extroverts app and website are owned by Extroverts or its licensors. You may not copy, modify, distribute, or create derivative works without our prior written consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-lg sm:text-xl font-bold text-white tracking-wide">
              Limitation of Liability
            </h2>
            <p className="text-gray-300 leading-relaxed text-base">
              Extroverts is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from your use of the app, including but not limited to personal injury, property damage, or emotional distress resulting from attending events discovered through our platform. Use the app at your own discretion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-lg sm:text-xl font-bold text-white tracking-wide">
              Termination
            </h2>
            <p className="text-gray-300 leading-relaxed text-base">
              You may stop using Extroverts at any time. We may suspend or terminate your access to the app if we believe you have violated these terms or engaged in harmful conduct. Upon termination, your right to use the app ceases immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-lg sm:text-xl font-bold text-white tracking-wide">
              Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed text-base">
              For questions about these terms, contact us at{" "}
              <a
                href="mailto:legal@extroverts.app"
                className="underline underline-offset-2 hover:text-white transition-colors"
              >
                legal@extroverts.app
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

