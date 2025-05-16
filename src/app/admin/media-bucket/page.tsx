import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { MediaUploader } from "@/features/admin/components/media-uploader";


export default function MediaBucket() {
  return (
    <div className="py-4 px-4">
      <div>
        <h1 className="text-2xl font-bold ">Media Bucket</h1>
      </div>
      <div>
        <MediaUploader />
        <div>
          <Tabs defaultValue="photos" className="mt-3 w-full">
            <TabsList>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="photos">
              {/* Content for Photos tab */}
              Photos content goes here
            </TabsContent>
            <TabsContent value="videos">
              {/* Content for Videos tab */}
              Videos content goes here
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div >
  );
}
