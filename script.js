// ============================================
// OPTIMISATIONS DE PERFORMANCE
// ============================================
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================
// MENU MOBILE HAMBURGER
// Gestion de l'ouverture/fermeture du menu sur mobile
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isActive);
        hamburger.setAttribute('aria-label', !isActive ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Ouvrir le menu de navigation');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Ouvrir le menu de navigation');
        }
    });
}

// ============================================
// COMPTEUR ANIMÉ POUR LES STATISTIQUES
// Animation des chiffres dans la section stats
// ============================================
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

// ============================================
// OBSERVATEUR D'INTERSECTION POUR L'ANIMATION DES STATS
// Déclenche l'animation quand la section devient visible
// ============================================
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

// ============================================
// TÉLÉCHARGEMENT DES FORMULAIRES CERFA
// Gestion du téléchargement des PDF Cerfa
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('#downloadCerfa, #downloadCerfaMain');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show notification
            showNotification('📥 Téléchargement du formulaire de demande d\'immatriculation Cerfa 13750*07 en cours...', 'info');
            
            // Download Cerfa PDF
            setTimeout(() => {
                // Path to Cerfa PDF in gallery folder
                const cerfaUrl = 'imgs/demande_de_certificat_immatriculation_vehicule_remplissable.pdf';
                
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

// Documents Modal - Définition déplacée plus bas pour éviter les doublons

// ============================================
// FONCTIONNALITÉ DES ONGLETS DE GALERIE
// Gestion du carrousel d'images des locaux
// ============================================
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

// ============================================
// WIDGET CHAT WHATSAPP
// Gestion du chat flottant WhatsApp
// ============================================
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

// ============================================
// DÉFILEMENT FLUIDE POUR LES LIENS DE NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;
            const topInfoBar = document.querySelector('.top-info-bar');
            const topInfoBarHeight = topInfoBar ? topInfoBar.offsetHeight : 0;
            const totalOffset = headerHeight + topInfoBarHeight + 20; // 20px extra padding
            const targetPosition = target.offsetTop - totalOffset;
            
            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// GESTION DU FORMULAIRE DE CONTACT
// Validation et envoi du formulaire
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Fonction pour ajouter l'état de chargement
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
    
    // Event listener unique pour le formulaire
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const resetLoading = addLoadingState(submitButton);
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.service || !data.message) {
            resetLoading();
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            resetLoading();
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(data.phone)) {
            resetLoading();
            showNotification('Veuillez entrer un numéro de téléphone valide.', 'error');
            return;
        }
        
        // Simulate API call
        setTimeout(() => {
            resetLoading();
            showNotification('Votre demande a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.', 'success');
            contactForm.reset();
        }, 2000);
    });
    
    // Service selection in contact form
    const serviceSelect = document.getElementById('service');
    const messageTextarea = document.getElementById('message');
    
    if (serviceSelect && messageTextarea) {
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
    }
});

// ============================================
// SYSTÈME DE NOTIFICATIONS
// Affichage des messages de notification
// ============================================
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


// Add smooth reveal animation for sections (hero must be visible immediately)
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.section-header');
    const heroElements = document.querySelectorAll('.hero-content, .hero-image');
    
    // Hero doit être visible immédiatement (pas d'animation)
    heroElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
    
    // Animation pour les autres sections seulement
    if (!isReducedMotion && revealElements.length > 0) {
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
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
        
        // Fallback: Show elements after 1 second if observer doesn't trigger
        setTimeout(() => {
            revealElements.forEach(el => {
                if (el.style.opacity === '0') {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        }, 1000);
    } else {
        revealElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
});

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    // Analytics tracking - integrate with your analytics service
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'engagement',
            'event_label': element
        });
    }
    // Here you would integrate with your analytics service
}

// Track service button clicks
document.querySelectorAll('.service-btn, .pricing-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackClick(btn, 'service_selection');
    });
});

// Track contact form interactions
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            trackClick(contactForm, 'contact_form_submission');
        });
    }
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

// ============================================
// DONNÉES DES DOCUMENTS PAR SERVICE
// Structure contenant tous les documents nécessaires pour chaque service
// ============================================
const documentsData = {
    immatriculation: {
        title: "Immatriculation véhicule",
        items: [
            {
                title: "Véhicule neuf - Documents obligatoires",
                icon: "fa-car",
                documents: [
                    "Certificat de conformité européen (COC)",
                    "Facture d'achat du véhicule originale",
                    "Justificatif de domicile de moins de 6 mois",
                    "Pièce d'identité en cours de validité (carte nationale d'identité ou passeport)",
                    "Permis de conduire valide",
                    "Attestation d'assurance du véhicule",
                    "Formulaire de demande d'immatriculation Cerfa 13750*07 dûment rempli et signé"
                ]
            },
            {
                title: "Véhicule d'occasion - Documents obligatoires",
                icon: "fa-exchange-alt",
                documents: [
                    "Certificat de cession (Cerfa 15776*02) dûment rempli et signé par les deux parties",
                    "Carte grise originale barrée et signée par l'ancien propriétaire",
                    "Contrôle technique de moins de 6 mois (obligatoire si véhicule de plus de 4 ans)",
                    "Justificatif de domicile de moins de 6 mois",
                    "Pièce d'identité en cours de validité du nouveau propriétaire",
                    "Permis de conduire valide",
                    "Attestation d'assurance du véhicule",
                    "Formulaire de demande d'immatriculation Cerfa 13750*07 dûment rempli et signé"
                ]
            },
            {
                title: "Documents complémentaires si nécessaire",
                icon: "fa-info-circle",
                documents: [
                    "Justificatif de non-gage (si le véhicule est gagé)",
                    "Autorisation parentale si le propriétaire est mineur",
                    "Procuration si demande faite par un tiers"
                ]
            }
        ]
    },
    immatriculation_fr: {
        title: "Changement de titulaire - Cartes grises françaises",
        items: [
            {
                title: "Documents obligatoires",
                icon: "fa-file-alt",
                documents: [
                    "Carte grise originale datée, barrée et signée par l'ancien propriétaire",
                    "Formulaire de demande d'immatriculation (Cerfa 13750*07) dûment rempli et signé",
                    "Certificat de cession (Cerfa 15776*02) dûment rempli et signé par les deux parties",
                    "Cerfa MANDAT de demande d'immatriculation (Cerfa 13750*03) dûment rempli et signé",
                    "Pièce d'identité en cours de validité de l'acquéreur",
                    "Permis de conduire valide de l'acquéreur",
                    "Justificatif de domicile de moins de 6 mois du nouveau propriétaire",
                    "Contrôle technique de moins de 6 mois (obligatoire si véhicule de plus de 4 ans)", 
                ]
            }
        ]
    },
    immatriculation_etranger: {
        title: "Changement de titulaire - Cartes grises étrangères (Importation E.U et Hors E.U)",
        items: [
            {
                title: "Documents obligatoires - Importation",
                icon: "fa-globe-europe",
                documents: [
                    "Carte grise étrangère originale ",
                    "Contrat de vente ou facture d'achat ",
                    "Pièce d'identité en cours de validité de l'acquéreur",
                    "Permis de conduire valide de l'acquéreur",
                    "Justificatif de domicile de moins de 6 mois",
                    "Contrôle technique de moins de 6 mois (obligatoire si véhicule de plus de 4 ans)",
                    "Certificat de conformité européen (COC) ou réception à titre isolé (RTI)",
                    "Attestation de douane (846A) pour véhicule hors UE",
                    "Formulaire de demande d'immatriculation (Cerfa 13750*07) dûment rempli et signé",
                    "Cerfa MANDAT de demande d'immatriculation (Cerfa 13750*03) dûment rempli et signé"
                ]
            },
            {
                title: "Documents spécifiques selon l'origine du véhicule",
                icon: "fa-map-marked-alt",
                documents: [
                    "<STRONG> Pour véhicule de l'Union Européenne :</STRONG> <br> Certificat de conformité européen (COC) obligatoire si carte grise étrangère incomplète <br> <br> Si véhicule plus 30ans : Attestaion véhicule de collection (FFVE)",
                    "<STRONG> Pour véhicule HORS Union Européenne :</STRONG> <br> Réception à titre isolé (RTI) a demander aupres de la DREAL  <br> Attestation de douane (846A) <br> Attestation de non conformité  ou conformite partielle <br> Si véhicule plus 30ans : Attestaion véhicule de collection (FFVE)",
                ]
            },

        ]
    },
    ww: {
        title: "Plaques WW provisoires",
        items: [
            {
                title: "Documents obligatoires",
                icon: "fa-clock",
                documents: [
                    "Carte(s) grise(s) étrangère(s) du véhicule ",
                    "Facture d'achat ou acte de vente ou cession de véhicule",
                    "Pièce d'identité en cours de validité ",
                    "Permis de conduire valide",
                    "Justificatif de domicile de moins de 6 mois",
                    "Contrôle technique valide",
                    "si véhicule hors UE : Attestation de douane (846A)",
                    "Formulaire de demande d'immatriculation Cerfa 13750*07 dûment rempli et signé",
                    "Cerfa MANDAT de demande d'immatriculation (Cerfa 13750*03) dûment rempli et signé"
                ]
            }
        ]
    },
    duplicata: {
        title: "Duplicata carte grise - Perte ou Vol",
        items: [
            {
                title: "En cas de perte - Documents obligatoires",
                icon: "fa-exclamation-triangle",
                documents: [
                    "Déclaration de perte (Cerfa 15776*04) dûment rempli et signé",
                    "Pièce d'identité en cours de validité",
                    "Permis de conduire valide",
                    "Justificatif de domicile de moins de 6 mois",
                    "Formulaire de demande d'immatriculation Cerfa 13750*07 dûment rempli et signé",
                    "Cerfa MANDAT de demande d'immatriculation (Cerfa 13750*03) dûment rempli et signé"
                ]
            },
            {
                title: "En cas de vol - Documents obligatoires",
                icon: "fa-shield-alt",
                documents: [
                    "Déclaration de perte (Cerfa 15776*04) dûment rempli et signé",
                    "Récépissé de depot de plainte délivré par la gendarmerie ou la police nationale",
                    "Pièce d'identité en cours de validité",
                    "Permis de conduire valide",
                    "Justificatif de domicile de moins de 6 mois",
                    "Cerfa MANDAT de demande d'immatriculation (Cerfa 13750*03) dûment rempli et signé",
                    "Formulaire de demande d'immatriculation Cerfa 13750*07 dûment rempli et signé"
                ]
            },
            {
                title: "Héritage",
                icon: "fa-shield-alt",
                documents: [],
                isMainTitle: true
            },
            {
                title: "Documents généraux",
                icon: "fa-file-alt",
                documents: [
                    "Acte de notoriété",
                    "Attestation de décès",
                    "Livret de famille",
                    "attestation de desistement + CNI Recto Verso de chaque héritier",
                    "controle technique valide (Aux epoux)",
                    "contrôle technique de moins de 6 mois (Aux enfants)",
                    "Certificat d'immatriculation du véhicule Cerfa 13750*07 dûment rempli et signé",
                ]
            },
            {
                title: "Documents titulaire",
                icon: "fa-user",
                documents: [
                    "Mandat de demande d'immatriculation (Cerfa 13750*03) dûment rempli et signé",
                    "Formulaire de demande d'immatriculation Cerfa 13750*07 dûment rempli et signé",
                    "Cerfa cession (Cerfa 15776*02) dûment rempli et signé",
                    "piece d'identité en cours de validité",
                    "permis de conduire valide",
                    "justificatif de domicile de moins de 6 mois"
                ]
            },
        ]
    },
    adresse: {
        title: "Changement d'adresse",
        items: [
            {
                title: "Documents obligatoires",
                icon: "fa-home",
                documents: [
                    "Carte grise originale ou copie du véhicule",
                    "Pièce d'identité en cours de validité",
                    "Permis de conduire valide",
                    "Justificatif de domicile de moins de 6 mois à la nouvelle adresse",
                    "Formulaire de demande d'immatriculation Cerfa 13750*07 dûment rempli et signé",
                    "Si carte grise sous ancien format (FNI) changement de plaque d'immatriculation obligatoire",
                    "Cerfa MANDAT de demande d'immatriculation (Cerfa 13750*03) dûment rempli et signé"
                ]
            },
            {
                title: "Types de justificatifs de domicile acceptés",
                icon: "fa-file-invoice",
                documents: [
                    "Facture d'électricité, gaz, eau ou téléphone de moins de 6 mois",
                    "Quittance de loyer de moins de 6 mois",
                    "Attestation d'hébergement avec pièce d'identité de l'hébergeur",
                    "Avis d'imposition de moins d'un an",
                    "Relevé de compte bancaire de moins de 3 mois"
                ]
            },
            {
                title: "Documents complémentaires si nécessaire",
                icon: "fa-info-circle",
                documents: [
                    "Justificatif de situation fiscale si changement de département"
                ]
            }
        ]
    },
    cession: {
        title: "Déclaration de cession et d'achat",
        items: [
            {
                title: "Pour le vendeur - Documents obligatoires",
                icon: "fa-user",
                documents: [
                    "Carte grise originale du véhicule",
                    "Certificat de cession (Cerfa 15776*02) en 2 exemplaires, dûment rempli et signé",
                    "Contrôle technique de moins de 6 mois (obligatoire si véhicule de plus de 4 ans)",
                    "Pièce d'identité en cours de validité (carte nationale d'identité ou passeport)",
                    "Permis de conduire valide",
                    "Justificatif de domicile de moins de 6 mois"
                ]
            },
            {
                title: "Pour l'acheteur - Documents obligatoires",
                icon: "fa-user-plus",
                documents: [
                    "Certificat de cession (Cerfa 15776*02) signé par le vendeur",
                    "Carte grise originale barrée et signée par le vendeur",
                    "Justificatif de domicile de moins de 6 mois",
                    "Pièce d'identité en cours de validité (carte nationale d'identité ou passeport)",
                    "Permis de conduire valide",
                    "Attestation d'assurance du véhicule au nom de l'acheteur",
                    "Formulaire de demande d'immatriculation Cerfa 13750*07 dûment rempli et signé"
                ]
            }
        ]
    },
    coc: {
        title: "Certificat de conformité (COC)",
        items: [
            {
                title: "Documents obligatoires",
                icon: "fa-certificate",
                documents: [
                    "Carte grise étrangère originale"
                ]
            },
            {
                title: "Important",
                icon: "fa-info-circle",
                documents: [
                    "Pour le reste des papiers nécessaires, veuillez contacter notre agence. Chaque marque de véhicule a ses propres procédures spécifiques pour obtenir le certificat de conformité (COC)."
                ]
            }
        ]
    }
    ,quitus: {
        title: "Demande de quitus fiscal (Tout la France)",
        items: [
            {
                title: "Documents obligatoires",
                icon: "fa-file-invoice-dollar",
                documents: [
                    "Carte grise étrangère du véhicule",
                    "Facture d'achat ou certificat de cession",
                    "Pièce d'identité en cours de validité ",
                    "Justificatif de domicile de moins de 6 mois",
                    "Formulaire de demande de quitus fiscal (Cerfa 15291*04) a imprimer et remplire en agence",
                    "Cerfa MANDAT de demande d'immatriculation (Cerfa 13750*03) dûment rempli et signé"
                ]
            },

        ]
    },

    plaques: {
        title: "Jeu de plaques d'immatriculation",
        items: [
            {
                title: "Plaques classiques <span class='title-small'>- Plaques auto SIV INCASSABLE</span>",
                icon: "fa-car",
                isMainTitle: true
            },
            {
                title: "",
                icon: "",
                images: [
                    "imgs/Plates/11.png",
                    "imgs/Plates/12.png"
                ]
            },
            {
                title: "Plaques collection <span class='title-small'>- Plaques auto SIV INCASSABLE</span>",
                icon: "fa-star",
                isMainTitle: true
            },
            {
                title: "",
                icon: "",
                images: [
                    "imgs/Plates/4.png",
                    "imgs/Plates/13.png"
                ]
            },
            {
                title: "Caractéristiques des plaques",
                icon: "fa-info-circle",
                documents: [
                    "Plaques conformes aux normes européennes",
                    "Différents formats disponibles selon vos besoins",
                    "Installation rapide et professionnelle",
                    "Garantie de qualité et de conformité"
                ]
            }
        ]
    },
    // Service : Demande de quitus fiscal
    // Document fiscal nécessaire pour l'immatriculation d'un véhicule importé ou acheté
    // Service disponible pour toute la France
    quitus: {
        title: "Demande de quitus fiscal (Tout la France)",
        items: [
            {
                title: "Documents obligatoires",
                icon: "fa-file-invoice-dollar",
                documents: [
                    "Carte grise originale du véhicule",
                    "Pièce d'identité en cours de validité du propriétaire",
                    "Justificatif de domicile de moins de 6 mois",
                    "Facture d'achat ou certificat de cession",
                    "Contrôle technique de moins de 6 mois (si véhicule de plus de 4 ans)",
                    "Formulaire de demande de quitus fiscal dûment rempli"
                ]
            },
            {
                title: "Informations importantes",
                icon: "fa-info-circle",
                documents: [
                    "Le quitus fiscal est nécessaire pour l'immatriculation d'un véhicule importé ou acheté",
                    "Délai de traitement : variable selon les services fiscaux",
                    "Service disponible pour toute la France",
                    "Pour plus d'informations, contactez notre agence"
                ]
            }
        ]
    }
};

// ============================================
// FONCTION GLOBALE : TÉLÉCHARGEMENT DES FORMULAIRES CERFA
// Télécharge les PDF Cerfa selon le type demandé
// ============================================
window.downloadCerfaPDF = function(cerfaType) {
    // Déterminer quel formulaire télécharger selon le type
    let cerfaUrl, fileName, notificationText;
    
    if (cerfaType === '15776' || cerfaType === 'cession') {
        // Pour le certificat de cession, on utilise le même PDF pour l'instant
        // ou on peut rediriger vers le site officiel
        cerfaUrl = 'https://www.service-public.fr/particuliers/vosdroits/R1136';
        fileName = 'Certificat-de-cession-15776.pdf';
        notificationText = '📥 Redirection vers le formulaire Cerfa 15776*02...';
    } else {
        // Formulaire de demande d'immatriculation Cerfa 13750*07 par défaut
        cerfaUrl = 'imgs/demande_de_certificat_immatriculation_vehicule_remplissable.pdf';
        fileName = 'Demande-Certificat-Immatriculation.pdf';
        notificationText = '📥 Téléchargement du formulaire de demande d\'immatriculation Cerfa 13750*07 en cours...';
    }
    
    showNotification(notificationText, 'info');
    
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = cerfaUrl;
        link.download = fileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('✅ Formulaire téléchargé ! N\'oubliez pas de le remplir avant de venir.', 'success');
    }, 500);
}

// ============================================
// FONCTION GLOBALE : AFFICHAGE DES DOCUMENTS
// Ouvre la modal avec les documents nécessaires pour un service
// ============================================
window.showDocuments = function(serviceType) {
    const modal = document.getElementById('documentsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDocumentsList = document.getElementById('modalDocumentsList');
    
    // Vérifier que tous les éléments existent
    if (!modal || !modalTitle || !modalDocumentsList) {
        // Modal elements not found - fail silently in production
        return;
    }
    
    const data = documentsData[serviceType];
    
    if (!data) {
        // Service type not found - fail silently in production
        return;
    }
    
    // Set title
    modalTitle.textContent = data.title;
    
    // Clear previous content
    modalDocumentsList.innerHTML = '';
    
    // Add documents
    if (data.items && Array.isArray(data.items)) {
        data.items.forEach(item => {
            const itemDiv = document.createElement('div');
            
            // Vérifier si c'est un titre principal
            if (item.isMainTitle) {
                itemDiv.className = 'modal-document-item modal-main-title';
                const title = document.createElement('h3');
                title.className = 'main-title';
                title.innerHTML = `<i class="fas ${item.icon}"></i> ${item.title}`;
                itemDiv.appendChild(title);
                modalDocumentsList.appendChild(itemDiv);
                return; // Ne pas continuer pour ce item
            }
            
            itemDiv.className = 'modal-document-item';
            
            // Vérifier si c'est une galerie d'images
            if (item.images && Array.isArray(item.images) && item.images.length > 0) {
                const imagesContainer = document.createElement('div');
                imagesContainer.className = 'modal-images-gallery';
                
                item.images.forEach(imagePath => {
                    const imgDiv = document.createElement('div');
                    imgDiv.className = 'modal-image-item';
                    const img = document.createElement('img');
                    img.src = imagePath;
                    img.alt = 'Exemple de plaque d\'immatriculation';
                    img.loading = 'lazy';
                    img.onerror = function() {
                        this.style.display = 'none';
                    };
                    imgDiv.appendChild(img);
                    imagesContainer.appendChild(imgDiv);
                });
                
                // Afficher le titre seulement s'il n'est pas vide
                if (item.title && item.title.trim() !== '') {
                    const title = document.createElement('h4');
                    title.innerHTML = item.icon ? `<i class="fas ${item.icon}"></i> ${item.title}` : item.title;
                    itemDiv.appendChild(title);
                }
                
                itemDiv.appendChild(imagesContainer);
                modalDocumentsList.appendChild(itemDiv);
                return; // Ne pas continuer pour ce item
            }
            
            const title = document.createElement('h4');
            title.innerHTML = `<i class="fas ${item.icon}"></i> ${item.title}`;
            
            const ul = document.createElement('ul');
            if (item.documents && Array.isArray(item.documents) && item.documents.length > 0) {
                let i = 0;
                while (i < item.documents.length) {
                    const doc = item.documents[i];
                    
                    // Vérifier si c'est une paire de Cerfa à afficher côte à côte
                    if (doc.startsWith('CERFA_PAIR:')) {
                        const cerfaPair = doc.split(':');
                        const cerfa1Type = cerfaPair[1]; // 15776
                        const cerfa2Type = cerfaPair[2]; // 13750
                        
                        const li = document.createElement('li');
                        li.className = 'cerfa-pair-item';
                        li.innerHTML = `
                            <div class="cerfa-pair-container">
                                <div class="cerfa-item-pair">
                                    <span class="doc-text">Certificat de cession (Cerfa 15776*02)</span>
                                    <button class="cerfa-download-btn" onclick="downloadCerfaPDF('${cerfa1Type}')" title="Télécharger le formulaire Cerfa 15776*02">
                                        <i class="fas fa-download"></i>
                                    </button>
                                </div>
                                <div class="cerfa-item-pair">
                                    <span class="doc-text">Formulaire de demande d'immatriculation Cerfa 13750*07</span>
                                    <button class="cerfa-download-btn" onclick="downloadCerfaPDF('${cerfa2Type}')" title="Télécharger le formulaire de demande d'immatriculation Cerfa 13750*07">
                                        <i class="fas fa-download"></i>
                                    </button>
                                </div>
                            </div>
                        `;
                        ul.appendChild(li);
                        i++;
                    } else {
                        const li = document.createElement('li');
                        
                        // Vérifier si le document contient "Cerfa" pour ajouter un bouton de téléchargement
                        if (doc.toLowerCase().includes('cerfa') || doc.toLowerCase().includes('formulaire')) {
                            // Déterminer le type de Cerfa
                            let cerfaType = '13750'; // Par défaut
                            if (doc.includes('15776') || doc.toLowerCase().includes('cession')) {
                                cerfaType = '15776';
                            }
                            
                            li.innerHTML = `
                                <span class="doc-text">${doc}</span>
                                <button class="cerfa-download-btn" onclick="downloadCerfaPDF('${cerfaType}')" title="Télécharger le formulaire Cerfa">
                                    <i class="fas fa-download"></i>
                                </button>
                            `;
                        } else {
                            li.innerHTML = `<span class="doc-text">${doc}</span>`;
                        }
                        
                        ul.appendChild(li);
                        i++;
                    }
                }
            }
            
            itemDiv.appendChild(title);
            itemDiv.appendChild(ul);
            modalDocumentsList.appendChild(itemDiv);
        });
    }
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
};

// ============================================
// FONCTION GLOBALE : FERMETURE DE LA MODAL
// Ferme la modal des documents
// ============================================
window.closeDocumentsModal = function() {
    const modal = document.getElementById('documentsModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
};

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
    });
}

// ============================================
// LOCAL IMAGES CAROUSEL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.local-image-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    
    let currentSlide = 0;
    let autoSlideInterval;

    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator' + (index === 0 ? ' active' : '');
        indicator.setAttribute('data-slide', index);
        indicator.setAttribute('aria-label', `Aller à l'image ${index + 1}`);
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active', 'prev'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');

        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    function goToSlide(index) {
        showSlide(index);
        resetAutoSlide();
    }

    function startAutoSlide() {
        if (slides.length <= 1) return;
        autoSlideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoSlide();
        }
    }

    // Hide controls and indicators if only one slide
    if (slides.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        if (indicatorsContainer) indicatorsContainer.style.display = 'none';
    } else {
        // Initialize first slide
        showSlide(0);
        
        // Start auto-slide after a short delay to ensure everything is loaded
        setTimeout(() => {
            startAutoSlide();
        }, 1000);
    }
});
