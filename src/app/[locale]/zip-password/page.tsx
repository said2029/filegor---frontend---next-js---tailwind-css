import React from "react";

export default function page() {
  return (
    <main className="mt-10">
      <h1 className="text-center text-3xl">Zip Password</h1>
      <div className="container mt-10 flex w-full flex-col items-center justify-center rounded-lg border border-black/15 bg-white p-5 px-9 text-start">
        <article>
          <p>
            All our zip downloads have the same and simple password, which is{" "}
            <strong>123</strong>.{" "}
          </p>
          <p>
            Modern operating systems, including Microsoft Windows and Apple
            macOS, have built-in support for zip files, so you can open them
            without any special tools.
          </p>
          <p>
            You can also download specialized tools that can offer more
            flexibility and handle other compressed formats, including{" "}
            <strong>
              <a href="" target="_blank" rel="noreferrer noopener">
                WinZip
              </a>
            </strong>
            ,{" "}
            <strong>
              <a href="" target="_blank" rel="noreferrer noopener">
                WinRAR
              </a>
            </strong>{" "}
            and{" "}
            <strong>
              <a href="" target="_blank" rel="noreferrer noopener">
                7-Zip
              </a>
            </strong>
            .
          </p>
        </article>
      </div>
    </main>
  );
}
