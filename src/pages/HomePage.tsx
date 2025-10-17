import { Link } from 'react-router-dom';
import { CheckSquare, FileText, Zap, Layers, Moon, Palette } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function HomePage() {
  const features = [
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Create, organize, and track your tasks with an intuitive interface.',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: FileText,
      title: 'Blog Posts',
      description: 'Browse and search through articles with pagination and filtering.',
      color: 'text-green-600 dark:text-green-400',
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Built with React and Vite for lightning-fast load times.',
      color: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      icon: Layers,
      title: 'Component Architecture',
      description: 'Reusable components following best practices and design patterns.',
      color: 'text-red-600 dark:text-red-400',
    },
    {
      icon: Moon,
      title: 'Dark Mode',
      description: 'Seamlessly switch between light and dark themes.',
      color: 'text-slate-600 dark:text-slate-400',
    },
    {
      icon: Palette,
      title: 'Tailwind CSS',
      description: 'Beautiful, responsive design with utility-first CSS framework.',
      color: 'text-teal-600 dark:text-teal-400',
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fadeIn">
            Welcome to React App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            A modern React application demonstrating component architecture, state management,
            hooks, and API integration with beautiful UI design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tasks">
              <Button className="w-full sm:w-auto text-lg px-8 py-3">
                Get Started
              </Button>
            </Link>
            <Link to="/posts">
              <Button variant="secondary" className="w-full sm:w-auto text-lg px-8 py-3">
                Explore Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore the powerful features built into this application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              hover
              className="text-center transform transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start managing your tasks and exploring content with our intuitive interface.
          </p>
          <Link to="/tasks">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Start Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
