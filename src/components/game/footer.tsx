export function Footer({ githubUsername }: { githubUsername: string }) {
  return (
    <footer className="mt-12 pb-6 text-center">
      <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-lg border border-[#00f5ff]/30">
        <span className="text-white/60 font-mono text-sm">
          Desenvolvido por
        </span>
        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00f5ff] font-mono font-bold hover:text-[#ff006e] transition-colors duration-300 underline underline-offset-4">
          @{githubUsername}
        </a>
      </div>
    </footer>
  );
}
