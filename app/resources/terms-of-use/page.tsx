export default function TermsOfUse() {
  return (
    <>
      <h2 className="text-2xl font-semibold">- Terms Of Use -</h2>
      <section className="align-start px-3 lg:px-24 py-6 max-w-screen-xl">
        <p>This application is currently in development, by entering any personal or identifiable information you consent to said information being used for the purposes and functions of this application.</p>
        <p className="mt-2">This includes but is not limited to:</p>
          
        <ul className="list-disc list-inside mt-2 ml-2">
          <li key="usage-0">Generating and storing API access credentials</li>
          <li key="usage-1">Accessing additional webstore information via the Neto API</li>
          <li key="usage-2">Displaying and using that data within this application</li>
        </ul>
        <p className="mt-6">Any data entered is only stored for the length of the browser session and is not shared with any 3rd parties. If you do not agree with these terms do not enter any personal or identifiable information into this application. By navigating and/or visiting this application some usage data may be recorded.</p>
      </section>
    </>
  );
}
