export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-2">
          About <span className="text-slate-500">Blogly</span>
        </h1>
        <p className="text-center text-gray-500 mb-12">
          Welcome to Blogly, your new favorite blogging platform!
        </p>

        <h2 className="text-xl font-bold text-slate-800 mb-3">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed mb-10">
          At Blogly, our mission is to provide a user-friendly and engaging
          platform for individuals to share their stories, ideas, and insights
          with the world. Whether you're a seasoned writer or just starting out,
          Blogly offers the tools and community you need to express yourself and
          connect with others.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mb-3">Features</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-10">
          <li>Create and publish your own blogs with ease</li>
          <li>Save your favorite blogs for later reading</li>
          <li>Like and comment on blogs to engage with the community</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-800 mb-3">Join Us</h2>
        <p className="text-gray-600 leading-relaxed">
          Ready to start your blogging journey with Blogly? Sign up today and
          join a community of passionate writers and readers. We can't wait to
          see what you'll create!
        </p>
      </div>
    </div>
  );
}
