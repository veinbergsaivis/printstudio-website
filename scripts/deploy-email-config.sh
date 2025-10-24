#!/bin/bash
# E-pasta konfigurācijas deployment skripts
# Izmantot uz servera ar: bash deploy-email-config.sh

echo "🚀 Deployojam e-pasta konfigurāciju..."
echo ""

# Krāsas
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Ceļi
PUBLIC_HTML="/home4/printstu/public_html"
REPO_PATH="/home4/printstu/repositories/printstudio-website"

# Pārbauda vai esam serverī
if [ ! -d "$PUBLIC_HTML" ]; then
    echo -e "${RED}✗ Šķiet, ka neesat serverī. Pārbaudiet ceļus.${NC}"
    exit 1
fi

# 1. Izveido contact.config.php
echo -e "${CYAN}1. Izveidojam contact.config.php...${NC}"

cat > "$PUBLIC_HTML/contact.config.php" << 'EOF'
<?php
return [
  'to' => 'info@printstudio.lv',
  'from' => 'no-reply@printstudio.lv',
  'smtp' => [
    'enabled' => true,
    'host' => 'printstudio.lv',
    'port' => 465,
    'user' => 'no-reply@printstudio.lv',
    'pass' => 'b6G_TivVkjbXM8nT',
    'secure' => 'ssl',
  ],
  'repo_root' => '/home4/printstu/repositories/printstudio-website',
];
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ contact.config.php izveidots${NC}"
else
    echo -e "${RED}✗ Neizdevās izveidot failu${NC}"
    exit 1
fi

# 2. Uzstāda atļaujas
echo -e "${CYAN}2. Uzstādām failu atļaujas...${NC}"
chmod 600 "$PUBLIC_HTML/contact.config.php"
echo -e "${GREEN}✓ Atļaujas: 600${NC}"

# 3. PHPMailer instalācija
echo -e "${CYAN}3. Instalējam PHPMailer...${NC}"
cd "$REPO_PATH"

if [ -f "composer.json" ]; then
    composer install --no-dev
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ PHPMailer instalēts${NC}"
    else
        echo -e "${YELLOW}⚠ PHPMailer instalācija neizdevās. Mēģiniet manuāli.${NC}"
    fi
else
    echo -e "${YELLOW}⚠ composer.json nav atrasts. Instalējiet PHPMailer manuāli.${NC}"
fi

# 4. Pārbauda vai test-email.php eksistē
echo -e "${CYAN}4. Pārbaudām test-email.php...${NC}"
if [ -f "$PUBLIC_HTML/test-email.php" ]; then
    echo -e "${GREEN}✓ test-email.php atrasts${NC}"
    echo -e "${CYAN}   Testējiet: https://printstudio.lv/test-email.php${NC}"
else
    echo -e "${YELLOW}⚠ test-email.php nav atrasts. Augšupielādējiet no dist/ mapes.${NC}"
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ E-pasta konfigurācija deployēta!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${CYAN}📝 Nākamie soļi:${NC}"
echo "1. Testējiet: https://printstudio.lv/test-email.php"
echo "2. Ja viss zaļš - testējiet kontakta formu"
echo "3. DZĒSIET test-email.php pēc testēšanas!"
echo ""
echo -e "${YELLOW}⚠  Ja SSL nestrādā (port 465), izmantojiet TLS:${NC}"
echo "   mv $PUBLIC_HTML/contact.config.php $PUBLIC_HTML/contact.config.SSL.backup"
echo "   # Pēc tam izveidojiet jaunu ar port 587 un 'tls'"
echo ""
