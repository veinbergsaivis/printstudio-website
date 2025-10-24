#!/bin/bash

# 📧 E-pasta uzstādīšanas pārbaudes skripts
# Palaist uz servera ar: bash email-setup-check.sh

echo "🔍 Pārbaudu e-pasta uzstādīšanu..."
echo ""

# Krāsas
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Ceļi
PUBLIC_HTML="/home4/printstu/public_html"
REPO_PATH="/home4/printstu/repositories/printstudio-website"

# Pārbaudes
ERRORS=0

# 1. Pārbaudam vai eksistē contact.php
echo -n "✓ Pārbaudu contact.php... "
if [ -f "$PUBLIC_HTML/contact.php" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}TRŪKST${NC}"
    ERRORS=$((ERRORS + 1))
fi

# 2. Pārbaudam contact.config.php
echo -n "✓ Pārbaudu contact.config.php... "
if [ -f "$PUBLIC_HTML/contact.config.php" ]; then
    echo -e "${GREEN}OK${NC}"
    
    # Pārbaudam vai nav default parole
    if grep -q "CHANGE_ME" "$PUBLIC_HTML/contact.config.php"; then
        echo -e "  ${YELLOW}⚠ BRĪDINĀJUMS: Default parole 'CHANGE_ME' joprojām lietota!${NC}"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}TRŪKST${NC}"
    echo -e "  ${YELLOW}Kopējiet: cp contact.config.example.php contact.config.php${NC}"
    ERRORS=$((ERRORS + 1))
fi

# 3. Pārbaudam PHPMailer
echo -n "✓ Pārbaudu PHPMailer... "
if [ -d "$REPO_PATH/vendor/phpmailer" ] || [ -d "$PUBLIC_HTML/../vendor/phpmailer" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${YELLOW}NAV INSTALĒTS${NC}"
    echo -e "  ${YELLOW}Palaidiet: cd $REPO_PATH && composer install${NC}"
fi

# 4. Pārbaudam PHP versiju
echo -n "✓ Pārbaudu PHP versiju... "
PHP_VERSION=$(php -v | head -n 1 | cut -d " " -f 2 | cut -d "." -f 1,2)
if (( $(echo "$PHP_VERSION >= 7.4" | bc -l) )); then
    echo -e "${GREEN}OK ($PHP_VERSION)${NC}"
else
    echo -e "${RED}PĀRĀK VECA ($PHP_VERSION)${NC}"
    echo -e "  ${YELLOW}Nepieciešama PHP 7.4 vai jaunāka${NC}"
    ERRORS=$((ERRORS + 1))
fi

# 5. Pārbaudam failu atļaujas
echo -n "✓ Pārbaudu failu atļaujas... "
if [ -f "$PUBLIC_HTML/contact.php" ]; then
    PERMS=$(stat -c "%a" "$PUBLIC_HTML/contact.php")
    if [ "$PERMS" == "644" ] || [ "$PERMS" == "640" ]; then
        echo -e "${GREEN}OK ($PERMS)${NC}"
    else
        echo -e "${YELLOW}NEPAREIZAS ($PERMS)${NC}"
        echo -e "  ${YELLOW}Iestatiet: chmod 644 contact.php${NC}"
    fi
fi

# 6. Pārbaudam dist mapi
echo -n "✓ Pārbaudu dist mapi... "
if [ -d "$PUBLIC_HTML" ] && [ "$(ls -A $PUBLIC_HTML)" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}TUKŠA${NC}"
    echo -e "  ${YELLOW}Palaidiet build un deploy${NC}"
    ERRORS=$((ERRORS + 1))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ Viss kārtībā! E-pasta sistēma ir gatava.${NC}"
    echo ""
    echo "📝 Nākamie soļi:"
    echo "1. Testējiet formu: https://printstudio.lv"
    echo "2. Pārbaudiet e-pastu: info@printstudio.lv"
else
    echo -e "${RED}✗ Atrasti $ERRORS problēmas. Lūdzu novērsiet tās.${NC}"
    echo ""
    echo "📖 Skatiet EMAIL_SETUP_GUIDE.md detaļām"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
