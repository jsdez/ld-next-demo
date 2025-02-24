import { Button } from "@/components/ui/button"; // Assuming you have the Button component set up with ShadCN UI
import FeatureComponent from "../components/FeatureComponent";  // Feature component for the feature flag

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <header className="w-full bg-white shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-8">
          <h1 className="text-2xl font-semibold text-blue-600">ABC Company</h1>
          <div className="space-x-4">
            <Button className="bg-blue-600 text-white">Contact</Button>
            <Button className="bg-gray-600 text-white">About</Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-grow text-center">
        <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to ABC Company</h2>
          <p className="text-lg text-gray-600 mb-6">
            We provide cutting-edge automation and process improvement solutions to help your business grow.
          </p>

          {/* Feature Component to test feature flag */}
          <FeatureComponent />
        </div>
      </main>

      <footer className="w-full bg-blue-600 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} ABC Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
