// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';

// const Contact: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log('Form submitted:', { name, email, message });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
//       <form onSubmit={handleSubmit} className="max-w-md">
//         <div className="mb-4">
//           <Label htmlFor="name">Name</Label>
//           <Input
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <Label htmlFor="message">Message</Label>
//           <Textarea
//             id="message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             required
//           />
//         </div>
//         <Button type="submit">Send Message</Button>
//       </form>
//     </div>
//   );
// };

// export default Contact;