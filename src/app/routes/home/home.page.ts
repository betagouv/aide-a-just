import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { GitBookAPI } from '@gitbook/api';
import { CommonModule } from '@angular/common';
import { DocCardInterface } from '../../components/doc-card/doc-card.component';
import { ServerService } from '../../services/http-server/server.service';
import { AppService } from '../../services/app/app.service';
import { MatIconModule } from '@angular/material/icon';
import { SanitizeResourceUrlPipe } from '../../pipes/sanitize-resource-url/sanitize-resource-url.pipe';
import { FormsModule } from '@angular/forms';
import { ReferentielService } from '../../services/referentiel/referentiel.service';
import { downloadFile } from '../../utils/system';
import { environment } from '../../../environments/environment';
//import { InputButtonComponent } from '../../components/input-button/input-button.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';

interface WebinaireAction {
  label: string;
  url: string;
}

interface webinaire {
  img: string;
  title: string;
  content: string;
  actions: WebinaireAction[];
  rank: number;
}
/**
 * Home page
 */

@Component({
  selector: 'aj-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SanitizeResourceUrlPipe,
    FormsModule,
    //InputButtonComponent,
    RouterModule,
    ButtonComponent,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput!: any;
  serverService = inject(ServerService);
  appService = inject(AppService);
  referentielService = inject(ReferentielService);
  environment = environment;
  /**
   * Résultat de la recherche GitBook
   */
  data: any = null;
  /**
   * Valeur de rechercher
   */
  searchValue: string = '';
  /**
   * Gitbook API
   */
  gitbook;
  /**
   * Focus barre de recherche
   */
  focusOn = false;
  /**
   * URL de la nomenclature
   */
  NOMENCLATURE_DOWNLOAD_URL = '/assets/nomenclature-A-Just.html';
  /**
   * GitBook Token
   */
  gitToken;
  /** Carte guide utilisateur */
  userGuide = {
    tag: 'Documentation',
    title: 'Le guide utilisateur',
    description:
      'Retrouvez la présentation des grandes fonctionnalités d’A-JUST que vous soyez débutant ou utilisateur avancé!',
    image: '/assets/images/avatar.svg',
    url: environment.DOCUMENTATION_URL,
  };
  /** Carte data book */
  dataBook = {
    tag: 'Documentation',
    title: 'Le data-book',
    description:
      "Ce guide détaille la source, et les requêtes permettant la préalimentation de chacune des « données logiciel » de la rubrique « Données d'activité».",
    image: '/assets/images/data-visualization.svg',
    url: environment.DATA_GITBOOK,
  };
  /** Carte nomenclature */
  nomenclature = {
    tag: 'Documentation',
    title: 'La nomenclature',
    description:
      'Vous permet de visualiser globalement et en détail le contenu de chaque contentieux et sous-contentieux. Au civil, vous y retrouverez la liste des NAC prises en compte dans chaque rubrique.',
    image: '/assets/images/system.svg',
    url: this.referentielService.isDroitLocal
      ? environment.NOMENCLATURE_DROIT_LOCAL_DOWNLOAD_URL
      : environment.NOMENCLATURE_DOWNLOAD_URL,
    localUrl: false,
    download: true,
  };
  /**
   * Cards documentation
   */
  docCards: Array<DocCardInterface> = [this.userGuide, this.dataBook, this.nomenclature];
  /**
   * Cards outils
   */
  docTools: Array<DocCardInterface> = [
    this.nomenclature,
    {
      tag: 'Les outils A-JUST',
      title: 'La calculatrice de ventilation des ETPT',
      description: '',
      image: '/assets/images/coding.svg',
      url: environment.CALCULATE_DOWNLOAD_URL,
    },
    {
      tag: 'Les outils A-JUST',
      title: 'L’extracteur de données d’effectifs',
      description: '',
      image: '/assets/images/Tableur.svg',
      url: environment.sourceUrl + 'dashboard',
      localUrl: true,
    },
    {
      tag: 'Les outils A-JUST',
      title: 'L’extracteur de données d’activité',
      description: '',
      image: '/assets/images/Tableur2.svg',
      url: environment.sourceUrl + 'dashboard',
      localUrl: true,
    },
  ];
  /**
   * webinaire
   */
  webinaires: Array<webinaire> | null = [];

  /**
   * Ouverture d'un iframe gitbook embeded
   */
  openSuggestionPanel = false;
  /**
   * Ouverture de popin d appel
   */
  popinCall = false;
  /**
   * Doc à afficher dans une IFRAME
   */
  openToIframe = { url: '', title: '' };
  /**
   * Liens vers la doc
   */
  documentation = [
    {
      url:   this.isTJ()?'https://docs.a-just.beta.gouv.fr/tout-savoir-en-un-coup-doeil/':'https://docs.a-just.beta.gouv.fr/tout-savoir-en-un-coup-doeil-ca/',
      title: "Tout savoir en un coup d'oeil",
      color: 'blue',
    },
    {
      url: this.isTJ()?'https://docs.a-just.beta.gouv.fr/prenez-en-main-votre-espace/':'https://docs.a-just.beta.gouv.fr/prenez-en-main-votre-espace-ca/',
      title: 'Prenez en main votre espace',
      color: 'green',
    },
    {
      url: this.isTJ()?'https://docs.a-just.beta.gouv.fr/pilotez-votre-juridiction/':'https://docs.a-just.beta.gouv.fr/pilotez-votre-juridiction-ca/',
      title: 'Pilotez votre juridiction',
      color: 'red',
    },
    {
      url: this.isTJ()?'https://docs.a-just.beta.gouv.fr/cas-dusage/':'https://docs.a-just.beta.gouv.fr/cas-dusage-ca   /',
      title: 'Cas d’usage',
      color: 'yellow',
    },
  ];
  /**
   * Cle date pour usage unique
   */
  cleDate = '?date=' + new Date();

  /**
   * GITBOOK ID
   */
  gitbookId = import.meta.env.NG_APP_GITBOOK_ID;
  /**
   * Organisation ID gitbook
   */
  organisationId = import.meta.env.NG_APP_GITBOOK_ORG_ID;
  /**
   * Type d'interface
   */
  interfaceType = import.meta.env.TYPE;
  /**
   * Bloqueur pour le prompteur en cas de valeur vide dans la barre de recherche
   */
  lockPrompt = true;
  /**
   * Affichage du résultat d'une question posée
   */
  displayResult = false;
  /**
   * Affichage du loader
   */
  displayLoader = false;
  /**
   * Constructeur
   */
  constructor() {
    this.gitToken = import.meta.env.NG_APP_GITBOOK_TOKEN;
    this.gitbook = new GitBookAPI({
      authToken: this.gitToken,
    });
    this.sendLog();
  }

  ngOnInit() {
    this.loadWebinaires();
  }

  ngAfterViewInit(): void {
    window.addEventListener('click', this.onClick.bind(this));
  }

  isTJ(): boolean {
    return this.interfaceType === 'TJ';
  }
  
  loseFocus() {
    console.log(this.searchInput);
    this.searchInput.triggerBlur();
  }
  onClick(e: any) {
    if (document.getElementById('help-center')?.contains(e.target)) {
      this.popinCall = false;
    }
  }

  async onSearchBy() {
    this.displayLoader = true;
    const { data } = await this.gitbook.orgs.askInOrganization(this.organisationId, { query: this.searchValue });
    console.log(this.gitbook);
    console.log(data);
    this.data = data;
    this.displayLoader = false;
  }

  getDocIcon(title: string) {
    switch (title) {
      case "Guide d'utilisateur A-JUST":
        return 'supervised_user_circle';
      case 'FAQ A-JUST':
        return 'question_answer';
      default:
        return 'face';
    }
  }

  async goTo(researchRes: any, title: string) {
    await this.serverService
      .post('centre-d-aide/log-documentation-link', {
        value: researchRes.urls.app,
      })
      .then((r) => {
        return r.data;
      });
    await this.serverService
      .post('centre-d-aide/log-documentation-recherche', {
        value: this.searchValue,
      })
      .then((r) => {
        return r.data;
      });

    switch (title) {
      case "Guide d'utilisateur A-JUST CA":
        window.open('https://docs.a-just.beta.gouv.fr/guide-dutilisateur-a-just-ca/' + researchRes.path);
        break;
      case "Guide d'utilisateur A-JUST":
        window.open('https://docs.a-just.beta.gouv.fr/documentation-deploiement/' + researchRes.path);
        break;
      case 'Le data-book':
        window.open('https://docs.a-just.beta.gouv.fr/le-data-book/' + researchRes.path);
        break;
      default:
        break;
    }
  }

  isValid(space: string) {
    if (environment.isCA) {
      switch (space) {
        case "Guide d'utilisateur A-JUST CA":
          return true;
        default:
          return false;
      }
    } else {
      switch (space) {
        case "Guide d'utilisateur A-JUST":
          return true;
        case 'Le data-book':
          return true;
        default:
          return false;
      }
    }
  }

  /**
   * Temporiser le focus d'un input
   */
  delay() {
    setTimeout(() => {
      this.focusOn = false;
    }, 200);
  }

  /**
   * Envoie de log
   */
  async sendLog() {
    /**
    await this.serverService.post('centre-d-aide/log-documentation').then((r) => {
      return r.data;
    });
    */
  }

  /**
   * Aller vers une page donnée
   * @param url
   * @param download
   */
  async goToLink(url: string, download = false) {
    await this.serverService
      .post('centre-d-aide/log-documentation-link', {
        value: url,
      })
      .then((r) => {
        return r.data;
      });
    if (environment.CALCULATE_DOWNLOAD_URL === url)
      this.appService.alert.next({
        text: "Le téléchargement va démarrer : cette opération peut, selon votre ordinateur, prendre plusieurs secondes. Merci de patienter jusqu'à l'ouverture de votre fenêtre de téléchargement.",
      });

    if ((url || '').startsWith('http')) {
      window.location.href = url;
    } else {
      if (download) {
        downloadFile(url);
      } else {
        window.open(url);
      }
    }
  }

  /**
   * Ouvrir un lien dans une autre page
   * @param url
   */
  openLink(url: string) {
    window.open(url, '_blank');
  }

  /**
   * Chargement des webinaires
   */
  /**
   * Extrait le texte d'un nœud de lien GitBook
   * @param linkNode - Nœud de type link
   * @returns Le texte du lien
   */
  private extractLinkText(linkNode: any): string {
    try {
      if (!linkNode) return '';
      
      // Fonction récursive pour extraire le texte de n'importe quel nœud
      const extractTextFromNode = (node: any): string => {
        if (!node) return '';
        
        // Si le nœud a des leaves (texte direct)
        if (node.leaves && Array.isArray(node.leaves)) {
          return node.leaves.map((leaf: any) => leaf.text || '').join('');
        }
        
        // Si le nœud a des nodes enfants, parcourir récursivement
        if (node.nodes && Array.isArray(node.nodes)) {
          return node.nodes.map((childNode: any) => extractTextFromNode(childNode)).join('');
        }
        
        return '';
      };
      
      return extractTextFromNode(linkNode).trim();
    } catch (error) {
      console.log('Erreur lors de l\'extraction du texte du lien', error);
      return '';
    }
  }

  /**
   * Extrait l'URL d'un nœud de lien GitBook
   * @param linkNode - Nœud de type link
   * @returns L'URL du lien
   */
  private extractLinkUrl(linkNode: any): string | null {
    try {
      // Essayer différentes structures possibles pour l'URL
      if (linkNode.data?.url) {
        return linkNode.data.url;
      }
      if (linkNode.data?.ref?.url) {
        return linkNode.data.ref.url;
      }
      if (linkNode.data?.href) {
        return linkNode.data.href;
      }
    } catch (error) {
      console.log('Erreur lors de l\'extraction de l\'URL du lien', error);
    }
    return null;
  }

  /**
   * Parse les actions (boutons) depuis les nœuds GitBook
   * @param nodes - Tableau de nœuds GitBook
   * @param startIndex - Index de départ (après l'image et le texte descriptif)
   * @returns Tableau d'actions avec label et URL
   */
  private parseActions(nodes: any[], startIndex: number): WebinaireAction[] {
    const actions: WebinaireAction[] = [];
    
    // Parcourir tous les nœuds à partir de startIndex
    for (let i = startIndex; i < nodes.length; i++) {
      const node = nodes[i];
      
      // Si c'est un nœud de type link directement
      if (node.type === 'link') {
        const url = this.extractLinkUrl(node);
        const label = this.extractLinkText(node);
        if (url) {
          // Si pas de label, utiliser l'URL comme label ou un label par défaut
          const finalLabel = label || url;
          actions.push({ label: finalLabel, url });
        }
      }
      // Si c'est un paragraphe contenant un lien
      else if (node.type === 'paragraph' && node.nodes) {
        for (const textNode of node.nodes) {
          if (textNode.type === 'link') {
            const url = this.extractLinkUrl(textNode);
            const label = this.extractLinkText(textNode);
            if (url) {
              // Si pas de label, utiliser l'URL comme label ou un label par défaut
              const finalLabel = label || url;
              actions.push({ label: finalLabel, url });
            }
          }
        }
      }
      // Rétrocompatibilité : si le nœud a directement une URL (ancien format)
      else if (node.data?.url && !node.data.url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        // C'est probablement un lien, pas une image
        const url = node.data.url;
        const label = this.extractLinkText(node) || url;
        actions.push({ label, url });
      }
    }
    
    return actions;
  }

  async loadWebinaires() {
    this.webinaires = new Array();
    const { data } = await this.gitbook.spaces.getPageByPath(this.gitbookId, 'accueil/');

    await Promise.all(
      data.pages.map(async (page, index) => {
        const { data } = (await this.gitbook.spaces.getPageById(this.gitbookId, page.id)) as any;
        try {
          const nodes = data.document?.nodes || [];
          
          // L'image est toujours le premier nœud
          const img = nodes[0]?.data?.url || '';
          
          // Le texte descriptif est le deuxième nœud
          const content = nodes[1]?.nodes?.[0]?.leaves?.[0]?.text || '';
          
          // Les actions commencent à partir du troisième nœud (index 2)
          const actions = this.parseActions(nodes, 2);
          
          let webinaire = {
            img,
            title: data.title,
            content,
            actions,
            rank: index,
          };
          if (data.title.includes('[CACHER]') === false) this.webinaires?.push(webinaire);
        } catch (error) {
          console.log("Le format du webinaire gitbook n'est pas conforme", data);
        }
      }),
    ).then(() => {
      this.webinaires?.sort((a, b) => a.rank - b.rank);
      console.log(this.webinaires);
    });
  }

  /**
   * Validation de saisie
   * @param e
   * @returns
   */
  validateNo(e: any) {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode === 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  /**
   * Recupère une iframe
   * @returns
   */
  getIframeUrl() {
    return this.openToIframe.url;
  }

  /**
   * Recharge le contenu d'une page
   */
  reloadContent() {
    this.openSuggestionPanel = !this.openSuggestionPanel;
  }
  /**
   * Recupere la clef de doc
   * @returns
   */
  getDocKeys(): Array<any> {
    return Object.keys(this.documentation);
  }

  /**
   * Mise en forme gras
   * @param leaf
   * @returns
   */
  isBold(leaf: any): boolean {
    return leaf.marks?.some((mark: any) => mark.type === 'bold');
  }
  /**
   * Mise en forme italic
   * @param leaf
   * @returns
   */
  isItalic(leaf: any): boolean {
    return leaf.marks?.some((mark: any) => mark.type === 'itcalic');
  }
  /**
   * Mise en forme souligné
   * @param leaf
   * @returns
   */
  isUnderline(leaf: any): boolean {
    return leaf.marks?.some((mark: any) => mark.type === 'underlined');
  }
  /**
   * recupère les sous éléments d'une liste non ordronnée
   * @param item
   * @returns
   */
  getUnorderedListNodes(item: any) {
    return item.nodes?.find((n: any) => n.type === 'list-unordered')?.nodes || [];
  }
  /**
   * recupère les éléments d'une liste non ordronnée
   * @param item
   * @returns
   */
  hasUnorderedList(item: any): boolean {
    return item.nodes?.some((n: any) => n.type === 'list-unordered');
  }

  /**
   * En cas de validation par le bouton entrer
   */
  onKeyDown() {
    if (this.lockPrompt === false) {
      this.data = null;
      this.onSearchBy();
      this.lockPrompt = true;
      this.displayResult = true;
      this.loseFocus();
    }
  }

  scrollTo(id: string, dom?: any, detalScrollY?: number) {
    const findElement = dom ? dom : document.getElementById('content');
    const findIdElement = document.getElementById(id);

    console.log('findElement', findElement);
    console.log('findIdElement', findIdElement);

    if (findElement && findIdElement) {
      const findTopElement = document.getElementById('top');
      let deltaToRemove = 0;

      if (findTopElement) {
        deltaToRemove = findTopElement.getBoundingClientRect().height;
      }

      findElement.scrollTo({
        behavior: 'smooth',
        top: findElement.scrollTop + findIdElement.getBoundingClientRect().top - deltaToRemove - (detalScrollY || 0),
      });
    }
  }
}
