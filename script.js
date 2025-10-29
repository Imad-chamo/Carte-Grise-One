// Performance optimizations
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================
// MOBILE MENU HAMBURGER
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Animated Counter for Stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((num, index) => {
                setTimeout(() => {
                    animateCounter(num);
                }, index * 100); // Stagger animation
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection && !isReducedMotion) {
        statsObserver.observe(statsSection);
    } else if (statsSection && isReducedMotion) {
        // Show final numbers immediately if reduced motion is preferred
        const statNumbers = statsSection.querySelectorAll('.stat-number');
        statNumbers.forEach(num => {
            num.textContent = num.getAttribute('data-target');
        });
    }
});

// Cerfa PDF Download
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('#downloadCerfa, #downloadCerfaMain');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show notification
            showNotification('📥 Téléchargement du formulaire Cerfa 13750*07 en cours...', 'info');
            
            // Download Cerfa PDF
            setTimeout(() => {
                // Path to Cerfa PDF in gallery folder
                const cerfaUrl = 'gallery/demande_de_certificat_immatriculation_vehicule_remplissable.pdf';
                
                // Create download link
                const link = document.createElement('a');
                link.href = cerfaUrl;
                link.download = 'Demande-Certificat-Immatriculation.pdf';
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                showNotification('✅ Formulaire Cerfa téléchargé ! N\'oubliez pas de le remplir avant de venir.', 'success');
            }, 500);
        });
    });
});

// Gallery tabs functionality
document.addEventListener('DOMContentLoaded', () => {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryContents = document.querySelectorAll('.gallery-tab-content');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            galleryTabs.forEach(t => t.classList.remove('active'));
            galleryContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding content
            const targetTab = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});

// WhatsApp Chat Widget
document.addEventListener('DOMContentLoaded', () => {
    const whatsappFloat = document.getElementById('whatsappFloat');
    const whatsappWidget = document.getElementById('whatsappWidget');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    // Open chat
    whatsappFloat.addEventListener('click', () => {
        whatsappWidget.classList.add('active');
        chatInput.focus();
    });

    // Close chat
    closeChat.addEventListener('click', () => {
        whatsappWidget.classList.remove('active');
    });

    // Send message
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Auto reply after 1 second
            setTimeout(() => {
                const botReply = getBotReply(message);
                addMessage(botReply, 'bot');
            }, 1000);
        }
    }

    sendMessage.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `whatsapp-message ${sender}-message`;
        
        const messageP = document.createElement('p');
        messageP.textContent = text;
        
        const messageTime = document.createElement('span');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.appendChild(messageP);
        messageDiv.appendChild(messageTime);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Bot responses
    function getBotReply(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('coût')) {
            return "💰 Notre service est à 30€ (hors frais officiels de carte grise). C'est très compétitif !";
        }
        
        if (lowerMessage.includes('temps') || lowerMessage.includes('rapide') || lowerMessage.includes('délai')) {
            return "⚡ Votre carte grise en 10 minutes seulement, sans rendez-vous ! C'est notre spécialité.";
        }
        
        if (lowerMessage.includes('document') || lowerMessage.includes('papier') || lowerMessage.includes('besoin')) {
            return "📋 Pour une carte grise, il vous faut : carte grise actuelle, justificatif de domicile, pièce d'identité. Je peux vous aider !";
        }
        
        if (lowerMessage.includes('adresse') || lowerMessage.includes('où') || lowerMessage.includes('localisation')) {
            return "📍 Nous sommes au 2a Rue de l'Industrie, 67450 Mundolsheim. Facilement accessible !";
        }
        
        if (lowerMessage.includes('contact') || lowerMessage.includes('téléphone') || lowerMessage.includes('appeler')) {
            return "📞 Appelez-nous au 03 88 97 18 60 ou venez nous voir directement. Nous sommes là pour vous !";
        }
        
        if (lowerMessage.includes('merci') || lowerMessage.includes('parfait') || lowerMessage.includes('ok')) {
            return "😊 De rien ! N'hésitez pas si vous avez d'autres questions. À bientôt !";
        }
        
        // Default response
        return "🤔 Je comprends votre question. Pour une réponse précise, appelez-nous au 03 88 97 18 60 ou venez nous voir au bureau. Nous sommes là pour vous aider !";
    }
});

// Mobile Navigation Toggle - Already defined at the top of the file

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.service) {
        showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Veuillez entrer une adresse email valide.', 'error');
        return;
    }
    
    // Phone validation
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('Veuillez entrer un numéro de téléphone valide.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Votre demande a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.', 'success');
    contactForm.reset();
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#fbbf24' : type === 'error' ? '#ef4444' : '#fbbf24'};
        color: ${type === 'success' ? '#000' : type === 'error' ? '#fff' : '#000'};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
        border-radius: 4px;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations (only if motion is not reduced)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = isReducedMotion ? null : new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .contact-item');
    
    if (!isReducedMotion && observer) {
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    } else {
        // Show elements immediately if reduced motion is preferred
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
});

// Service selection in contact form
const serviceSelect = document.getElementById('service');
const messageTextarea = document.getElementById('message');

serviceSelect.addEventListener('change', function() {
    const serviceMessages = {
        'renouvellement': 'Je souhaite renouveler ma carte grise. Pouvez-vous me donner plus d\'informations sur les délais et les documents nécessaires ?',
        'duplicata': 'J\'ai perdu ma carte grise et j\'ai besoin d\'un duplicata. Comment procéder ?',
        'changement-adresse': 'Je viens de déménager et je dois mettre à jour l\'adresse sur ma carte grise. Quels sont les documents à fournir ?',
        'changement-titulaire': 'Je souhaite transférer la propriété de mon véhicule. Pouvez-vous m\'accompagner dans cette démarche ?'
    };
    
    if (serviceMessages[this.value]) {
        messageTextarea.value = serviceMessages[this.value];
    }
});

// Add loading state to form submission
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Envoi en cours...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    return () => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    };
}

// Enhanced form submission with loading state
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const resetLoading = addLoadingState(submitButton);
    
    // Simulate API call
    setTimeout(() => {
        resetLoading();
        showNotification('Votre demande a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.', 'success');
        contactForm.reset();
    }, 2000);
});

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('.section-header, .hero-content, .hero-image');
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    console.log(`Analytics: ${action} clicked on ${element}`);
    // Here you would integrate with your analytics service
}

// Track service button clicks
document.querySelectorAll('.service-btn, .pricing-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackClick(btn, 'service_selection');
    });
});

// Track contact form interactions
contactForm.addEventListener('submit', () => {
    trackClick(contactForm, 'contact_form_submission');
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trapping for mobile menu
if (navMenu) {
    trapFocus(navMenu);
}

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
        
        // Keyboard support for FAQ
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
});

// ============================================
// DOCUMENTS MODAL
// ============================================

const documentsData = {
    immatriculation: {
        title: "Immatriculation véhicule",
        items: [
            {
                title: "Véhicule neuf",
                icon: "fa-car",
                documents: [
                    "Certificat de conformité européen",
                    "Facture d'achat du véhicule",
                    "Justificatif de domicile (moins de 6 mois)",
                    "Pièce d'identité en cours de validité",
                    "Formulaire Cerfa 13750*07"
                ]
            },
            {
                title: "Véhicule d'occasion",
                icon: "fa-exchange-alt",
                documents: [
                    "Certificat de cession (Cerfa 15776*02)",
                    "Carte grise barrée et signée",
                    "Contrôle technique de moins de 6 mois",
                    "Justificatif de domicile (moins de 6 mois)",
                    "Pièce d'identité en cours de validité",
                    "Formulaire Cerfa 13750*07"
                ]
            }
        ]
    },
    ww: {
        title: "Plaques WW provisoires",
        items: [
            {
                title: "Documents nécessaires",
                icon: "fa-clock",
                documents: [
                    "Carte grise du véhicule",
                    "Pièce d'identité en cours de validité",
                    "Justificatif de domicile (moins de 6 mois)",
                    "Attestation d'assurance provisoire",
                    "Motif de la demande (export, transit, etc.)"
                ]
            }
        ]
    },
    duplicata: {
        title: "Duplicata carte grise",
        items: [
            {
                title: "En cas de perte",
                icon: "fa-exclamation-triangle",
                documents: [
                    "Déclaration de perte",
                    "Pièce d'identité en cours de validité",
                    "Justificatif de domicile (moins de 6 mois)",
                    "Formulaire Cerfa 13750*07"
                ]
            },
            {
                title: "En cas de vol",
                icon: "fa-shield-alt",
                documents: [
                    "Déclaration de vol (commissariat/gendarmerie)",
                    "Pièce d'identité en cours de validité",
                    "Justificatif de domicile (moins de 6 mois)",
                    "Formulaire Cerfa 13750*07"
                ]
            }
        ]
    },
    adresse: {
        title: "Changement d'adresse",
        items: [
            {
                title: "Documents nécessaires",
                icon: "fa-home",
                documents: [
                    "Carte grise originale",
                    "Justificatif de domicile de moins de 6 mois",
                    "Pièce d'identité en cours de validité",
                    "Formulaire Cerfa 13750*07"
                ]
            }
        ]
    },
    cession: {
        title: "Déclaration de cession",
        items: [
            {
                title: "Pour le vendeur",
                icon: "fa-user",
                documents: [
                    "Carte grise originale",
                    "Certificat de cession (Cerfa 15776*02) en 2 exemplaires",
                    "Contrôle technique de moins de 6 mois (si +4 ans)",
                    "Pièce d'identité"
                ]
            },
            {
                title: "Pour l'acheteur",
                icon: "fa-user-plus",
                documents: [
                    "Certificat de cession signé",
                    "Carte grise barrée",
                    "Justificatif de domicile (moins de 6 mois)",
                    "Pièce d'identité en cours de validité",
                    "Formulaire Cerfa 13750*07"
                ]
            }
        ]
    },
    coc: {
        title: "Certificat de conformité (COC)",
        items: [
            {
                title: "Documents nécessaires",
                icon: "fa-certificate",
                documents: [
                    "Carte grise du véhicule",
                    "Pièce d'identité en cours de validité",
                    "Numéro de série du véhicule (VIN)",
                    "Marque et modèle du véhicule",
                    "Date de première mise en circulation"
                ]
            }
        ]
    }
};

function showDocuments(serviceType) {
    const modal = document.getElementById('documentsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDocumentsList = document.getElementById('modalDocumentsList');
    
    const data = documentsData[serviceType];
    
    if (!data) return;
    
    // Set title
    modalTitle.textContent = data.title;
    
    // Clear previous content
    modalDocumentsList.innerHTML = '';
    
    // Add documents
    data.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'modal-document-item';
        
        const title = document.createElement('h4');
        title.innerHTML = `<i class="fas ${item.icon}"></i> ${item.title}`;
        
        const ul = document.createElement('ul');
        item.documents.forEach(doc => {
            const li = document.createElement('li');
            li.textContent = doc;
            ul.appendChild(li);
        });
        
        itemDiv.appendChild(title);
        itemDiv.appendChild(ul);
        modalDocumentsList.appendChild(itemDiv);
    });
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeDocumentsModal() {
    const modal = document.getElementById('documentsModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('documentsModal');
    if (event.target === modal) {
        closeDocumentsModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDocumentsModal();
    }
});

// =============================================
// COOKIE CONSENT MANAGEMENT
// =============================================

function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookieConsent');
    if (cookieBanner) {
        cookieBanner.classList.remove('show');
        // Force hide after animation
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 500);
    }
}

// Show cookie banner after 1 second if not already accepted/rejected
setTimeout(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    const cookieBanner = document.getElementById('cookieConsent');
    
    if (!cookieConsent && cookieBanner) {
        cookieBanner.classList.add('show');
    } else if (cookieBanner) {
        cookieBanner.style.display = 'none';
    }
}, 1000);

// Accept cookies
const acceptBtn = document.getElementById('acceptCookies');
if (acceptBtn) {
    acceptBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.setItem('cookieConsent', 'accepted');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        hideCookieBanner();
        console.log('✅ Cookies accepted');
    });
}

// Reject cookies
const rejectBtn = document.getElementById('rejectCookies');
if (rejectBtn) {
    rejectBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.setItem('cookieConsent', 'rejected');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        hideCookieBanner();
        console.log('❌ Cookies rejected');
    });
}
