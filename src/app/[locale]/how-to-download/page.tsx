import { config } from "@/utils/contents";
import React from "react";
export const dynamic = "force-static";
export default function page() {
  return (
    <main className="mt-10">
      <h1 className="text-center text-3xl">How to Download files</h1>
      <div className="container mt-10 flex w-full flex-col items-center justify-center rounded-lg border border-black/15 bg-white p-5 px-9 text-start">
        <article className="prose lg:prose-xl">
          <p className="mb-4">
            Follow the steps below to download your favorite files from {config.name}.
          </p>
          <h2 className="mt-8 mb-4 text-2xl font-bold">
            <strong>Search a Software</strong>
          </h2>
          <p className="mb-4">Navigate to the {config.name} website.</p>
          <p className="mb-4">
            Use the search bar located in the navigation bar at the top of the
            page to search for a specific software by name.
          </p>
          <p className="mb-4">
            Alternatively, you can browse software by category by clicking on
            one of the category links located in the navigation bar or on the
            homepage.
          </p>
          <p className="mb-4">
            You can also use the filters located on the left side of the page to
            narrow your search results by various criteria, such as operating
            system, language, or price.
          </p>
          <p className="mb-4">
            Once you have found the software you are looking for, you can click
            on its listing to view more information and download options.
          </p>
          <p className="mb-4">
            First, you need to search for software by inputting its name in the
            search bar.&nbsp;
          </p>
          <p className="mb-4">
            Users can find the search bar in the navigation bar on the top of
            {config.name}.
          </p>
          <p className="mb-4">
            You can also filter software by categories to find your favorite
            software.&nbsp;
          </p>
          <h2 className="mt-8 mb-4 text-2xl font-bold">
            <strong>Download the Software</strong>
          </h2>
          <p className="mb-4">
            Once you have found the software you are looking for, click on its
            listing to view more information and download options.
          </p>
          <p className="mb-4">
            {config.name} offers both <strong>direct download</strong> and{" "}
            <strong>torrent download</strong> options. To download the software
            using direct download, click the “Direct Download” button. The
            download will begin immediately and the file will be downloaded
            directly from the {config.name} servers.
          </p>
          <p className="mb-4">
            To download the software using torrent download, you will need a
            torrent client such as BitTorrent or uTorrent installed on your
            computer. Click the “Download Torrent” button to download the
            torrent file, and then open the file using your torrent client to
            start the download.
          </p>
          <p className="mb-4">
            Once the download is complete, you will receive a ZIP file
            containing the software. To extract the file, right-click it and
            choose the “Extract to” option. Select a destination for the files,
            and they will be extracted to that location.
          </p>
          <h2 className="mt-8 mb-4 text-2xl font-bold">
            <strong>How to extract files from a Zip File?</strong>
          </h2>
          <p className="mb-4">To extract files from a ZIP file, follow these steps:</p>
          <p className="mb-4">Locate the ZIP file on your computer.</p>
          <p className="mb-4">Right-click the ZIP file and choose the “Extract to” option.</p>
          <p className="mb-4">
            Choose a destination for the extracted files and click “OK.” The
            files will be extracted to the selected location.
          </p>
          <p className="mb-4">
            <strong>
              If the ZIP file is password protected, the standard password is
              “123”. Simply enter this password when prompted to extract the
              file.
            </strong>
          </p>
          <p className="mb-4">
            If you do not have a program installed on your computer that can
            extract ZIP files, you can download a free file archiving program
            such as 7-Zip or WinZip. These programs will allow you to extract
            files from a ZIP file as well as create your own ZIP files.
          </p>
          <h2 className="mt-8 mb-4 text-2xl font-bold">
            <strong>Where is the download File Saved?</strong>
          </h2>
          <p className="mb-4">
            The download file is usually saved in the default download location
            on your computer.
          </p>
          <p className="mb-4">
            In Windows, the default download location is typically
            “C:\Users\username\Downloads,” where “username” is the name of your
            user account.
          </p>
          <p className="mb-4">
            In macOS, the default download location is usually the “Downloads”
            folder in your home directory.
          </p>
          <p className="mb-4">
            In Linux, the default download location can vary depending on the
            distribution and browser you are using. Some common download
            locations include the “Downloads” folder in your home directory or
            the “/tmp” directory.
          </p>
          <p className="mb-4">
            You can change the default download location in your browser
            settings if you want to save downloaded files to a different
            location.
          </p>
        </article>
      </div>
    </main>
  );
}
