export default function Home() {
  return (
    <main className="landing">
      <div className="wrap">
        <h1>Networking Dashboard Builder</h1>
        <p className="lead">
          Turn your LinkedIn network into a ranked recruiting dashboard — with
          internship targets, AI-tailored outreach, and resume help. Built for
          students.
        </p>
        <div className="cards">
          <a className="card" href="/networking-builder.html">
            <div className="tag">Try it</div>
            <h2>Launch the Builder →</h2>
            <span>
              Fill out your profile and upload your own LinkedIn{" "}
              <b>Connections.csv</b>. Your connections are parsed and ranked
              entirely in your browser — only the text you send to the AI leaves
              your device.
            </span>
          </a>
          <a className="card" href="/networking-dashboard-demo.html">
            <div className="tag blue">Demo</div>
            <h2>View the Demo Dashboard →</h2>
            <span>
              See the full end product running on sample data: ranked network,
              internships, applications, and AI tools.
            </span>
          </a>
        </div>
        <div className="foot">
          Compliant by design — uses each user&apos;s own LinkedIn data export,
          no scraping. Demo data is fabricated.
          <br />
          Source:{" "}
          <a href="https://github.com/BILSHUP/networking-dashboard-builder">
            github.com/BILSHUP/networking-dashboard-builder
          </a>
        </div>
      </div>
    </main>
  );
}
