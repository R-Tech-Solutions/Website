import React from 'react';
import Button from './Button';

const Footer = () => {
    return (
        <footer className="relative mt-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 border-t border-slate-200/60">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Brand Section - Larger span */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-2xl  flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <img src="/new_brand.png" alt="R-tech Solution" className="w-11 h-11 object-contain rounded-xl" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-xl text-slate-900 mb-1">R-tech Solution</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">Transforming businesses through innovative digital solutions</p>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed">
                            End-to-end technology services specializing in web development, mobile applications,
                            POS systems, network infrastructure, and advanced security solutions.
                        </p>

                        {/* Newsletter */}
                        <div className="pt-2">
                            <h5 className="font-semibold text-sm text-slate-900 mb-3">Stay Updated</h5>
                            <form className="flex gap-2">
                                <input
                                    type="email"
                                    aria-label="email"
                                    className="flex-1 rounded-xl px-4 py-2.5 bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    placeholder="Enter your email"
                                />
                                <Button size="sm" className="px-6">Subscribe</Button>
                            </form>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Services */}
                        <div>
                            <h5 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide">Services</h5>
                            <ul className="space-y-3">
                                {['Web Development', 'App Development', 'POS Systems', 'CCTV Solutions', 'Network Setup', 'Cloud Services'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h5 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide">Company</h5>
                            <ul className="space-y-3">
                                {['About Us', 'Our Team', 'Careers', 'Partners', 'Success Stories', 'News'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h5 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide">Resources</h5>
                            <ul className="space-y-3">
                                {['Documentation', 'API Reference', 'Case Studies', 'Blog', 'Help Center', 'Community'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h5 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide">Contact</h5>
                            <ul className="space-y-3">
                                <li className="text-sm text-slate-600">
                                    <span className="block font-medium text-slate-700 mb-1">Email</span>
                                    <a href="mailto:hello@r-tech.example" className="hover:text-blue-600 transition-colors">hello@r-tech.example</a>
                                </li>
                                <li className="text-sm text-slate-600">
                                    <span className="block font-medium text-slate-700 mb-1">Phone</span>
                                    <a href="tel:+15551234567" className="hover:text-blue-600 transition-colors">+1 (555) 123-4567</a>
                                </li>
                                <li className="text-sm text-slate-600">
                                    <span className="block font-medium text-slate-700 mb-1">Address</span>
                                    <span className="leading-relaxed">123 Tech Street<br />San Francisco, CA 94105</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-12 pt-8 border-t border-slate-200/60">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-700">Follow Us</span>
                            <div className="flex items-center gap-3">
                                {/* LinkedIn */}
                                <a
                                    href="https://www.linkedin.com/in/yourprofile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-sm"
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                                        alt="LinkedIn"
                                        className="w-6 h-6"
                                    />
                                </a>

                                {/* WhatsApp */}
                                <a
                                    href="https://wa.me/947XXXXXXXX" // replace with your WhatsApp number
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-sm"
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                                        alt="WhatsApp"
                                        className="w-6 h-6"
                                    />
                                </a>

                                {/* Instagram */}
                                <a
                                    href="https://www.instagram.com/yourprofile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-sm"
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                                        alt="Instagram"
                                        className="w-6 h-6"
                                    />
                                </a>

                                {/* Facebook */}
                                <a
                                    href="https://www.facebook.com/yourprofile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-sm"
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                                        alt="Facebook"
                                        className="w-6 h-6"
                                    />
                                </a>
                            </div>
                        </div>

                        {/* Policy Links */}
                        <div className="flex items-center gap-6 text-sm text-slate-600">
                            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                            <span className="text-slate-300">•</span>
                            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                            <span className="text-slate-300">•</span>
                            <a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>

            </div>

            <footer id="contact" className="py-8 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} R-Tech Solutions, Pvt Ltd. All rights reserved
            </footer>

        </footer>
    );
};
export default Footer;
