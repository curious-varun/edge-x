import VideoUploader from "@/features/admin/components/video-upload";

export default function MediaBucket() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Media Bucket</h1>
      <VideoUploader />

      {/* You could add a media gallery component here later */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Your Media</h2>
        <p className="text-gray-500">Your uploaded media will appear here.</p>
      </div>
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
          src="https://iframe.mediadelivery.net/embed/416233/a1286626-b769-4e4c-b5ba-676649175ae4?autoplay=false&loop=false&muted=false&preload=true&responsive=true"
          loading="lazy"
          style={{
            border: 0,
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
          }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          title="Media Delivery Video"
        ></iframe>
      </div>
    </div>
  );
}
