import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export const StayInLoopSection: React.FC = () => {
  return (
    <div className="bg-gray-800 px-5 py-12 text-sm md:px-12">
      <div className="m-auto flex max-w-6xl flex-col items-start justify-between gap-7 md:flex-row md:items-center md:gap-5">
        <div>
          <h3 className="pb-2 font-heading text-2xl font-medium text-white">
            Want to stay in the loop?
          </h3>
          <div className="text-gray-400">
            Be the first to know about new crowds, features and launches.
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-3">
          <Input
            placeholder="Enter your email"
            className="max-w-xs border-gray-500 bg-transparent text-base text-white outline-2"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  );
}
