import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-navy/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-48 sm:w-80 h-48 sm:h-80 rounded-full bg-burgundy/10 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-gold/10 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #1e3a5f 1px, transparent 1px), linear-gradient(to bottom, #1e3a5f 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-32">
        <div className="text-center max-w-4xl mx-auto">
          
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 sm:mb-8">
            <span className="text-ink">Royal </span>
            <span className="text-burgundy">Commerce</span>
          </h1>
          
          <p className="text-base sm:text-xl text-graphite max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
            A premium e-commerce platform built with Java Spring Boot microservices, 
            featuring service discovery, API gateway with JWT authentication, 
            and event-driven notifications.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/products"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-display font-semibold text-base sm:text-lg text-ivory bg-navy rounded-xl hover:bg-navy-deep hover:shadow-xl hover:shadow-navy/20 transition-all duration-300"
                >
                  Browse Products
                </Link>
                <Link
                  to="/orders"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-display font-semibold text-base sm:text-lg text-navy border-2 border-navy/30 rounded-xl hover:bg-navy/5 transition-all duration-300"
                >
                  View Orders
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-display font-semibold text-base sm:text-lg text-ivory bg-navy rounded-xl hover:bg-navy-deep hover:shadow-xl hover:shadow-navy/20 transition-all duration-300"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-display font-semibold text-base sm:text-lg text-navy border-2 border-navy/30 rounded-xl hover:bg-navy/5 transition-all duration-300"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-16 sm:mt-32 px-2 sm:px-0">
          {[
            { icon: '🔐', title: 'JWT Authentication', description: 'Secure authentication with role-based access control and token management.' },
            { icon: '🛒', title: 'Shopping Cart', description: 'Persistent cart with real-time updates and seamless checkout flow.' },
            { icon: '📦', title: 'Order Management', description: 'Complete order lifecycle with status tracking and payment integration.' },
            { icon: '🔔', title: 'Notifications', description: 'Event-driven notifications via Kafka for emails and SMS updates.' },
            { icon: '🌐', title: 'API Gateway', description: 'Centralized routing, load balancing, and request filtering.' },
            { icon: '🔍', title: 'Service Discovery', description: 'Dynamic service registration with Netflix Eureka.' },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-cream border border-stone hover:border-navy/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="font-display font-semibold text-base sm:text-lg text-ink mb-1 sm:mb-2">
                {feature.title}
              </h3>
              <p className="text-graphite text-xs sm:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mt-16 sm:mt-32 text-center">
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-charcoal mb-6 sm:mb-8">
            Built with Modern Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-4">
            {['Spring Boot', 'MySQL', 'Kafka', 'Docker', 'Eureka', 'React', 'TanStack Query'].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-cream border border-stone text-xs sm:text-sm font-mono text-graphite"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
