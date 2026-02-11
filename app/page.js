export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "system-ui, sans-serif", lineHeight: "1.5" }}>
      <h1>QR Menu Viewer</h1>
      <p>This is a read-only menu viewer.</p>
      <p>Please use a URL with a restaurant ID, for example:</p>
      <code>/menu/your-restaurant-id</code>
    </div>
  );
}
