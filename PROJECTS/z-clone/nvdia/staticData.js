/**
 * Array of AI-related blog card data for display in the application.
 *
 * Each card object contains metadata and content for a blog post, including:
 * ```category, type, title, description, imageUrl, 
 **/
const AiData = [
  {
    title: "Artificial Intelligence",
    description: "AI is powering change in every industry. From generative AI and speech recognition to medical imaging and improved supply chain management, AI is providing enterprises that compute power, tools, and algorithms their teams need to do their life's work.",
    links: [
      { url: "https://www.nvidia.com/en-us/ai-data-science/", label: "Overview" },
      { url: "https://www.nvidia.com/en-us/deep-learning-ai/solutions/data-analytics/", label: "Data Analytics" },
      { url: "https://www.nvidia.com/en-us/deep-learning-ai/solutions/machine-learning/", label: "Machine Learning" },
      { url: "https://www.nvidia.com/en-us/deep-learning-ai/solutions/prediction-forecasting/", label: "Predictive Analytics" },
      { url: "https://developer.nvidia.com/nvidia-merlin", label: "Recommender Systems" },
      { url: "https://www.nvidia.com/en-us/ai-data-science/products/riva/", label: "Speech AI" },
      { url: "https://www.nvidia.com/en-us/deep-learning-ai/solutions/data-science/apache-spark-3/", label: "Apache Spark" },
      { url: "https://www.nvidia.com/en-us/deep-learning-ai/software/rapids/", label: "RAPIDS" }
    ]
  },
  {
    category: "Artificial Intelligence",
    type: "Blog",
    title: "OpenAI's New Open-Source Models Accelerated on RTX AI PCs",
    description:
      "Groundbreaking open-weight models are now available with local optimizations for NVIDIA GeForce RTX and RTX PRO GPUs.",
    imageUrl:
      "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374/item_1722277565106.coreimg.100.410.jpeg/1754413892500/project-nv-sfg-2560x1440.jpeg",

    link: "https://blogs.nvidia.com/blog/rtx-ai-garage-openai-oss/",
  },
  {
    category: "Artificial Intelligence",
    type: "Blog",
    title:
      "Llama Nemotron Super Tops Artificial Analysis Intelligence Index Leaderboard",
    description:
      "Llama Nemotron Super achieves best-in-class accuracy across reasoning and agentic tasks.",
    imageUrl:
      "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374/item_1669196231595_c_431732407.coreimg.100.410.png/1754413892557/llama-nemotron-reasoning-blog-1920x1080.png",
    link: "https://developer.nvidia.com/blog/build-more-accurate-and-efficient-ai-agents-with-the-new-nvidia-llama-nemotron-super-v1-5/",
  },
  {
    category: "Artificial Intelligence",
    type: "Blog",
    title: "Financial Services Go Further With Agentic AI",
    description:
      "BlackRock, Capital One, and RBC use AI agents to boost productivity, efficiency, and security.",
    imageUrl:
      "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374/item_1722403062839.coreimg.100.410.jpeg/1754413892907/genai-on-corp-sfg.jpeg",

    link: "http://blogs.nvidia.com/blog/how-financial-services-companies-use-agentic-ai/",
  },
  {
    category: "Artificial Intelligence",
    type: "Blog",
    title: "NVIDIA Dynamo Delivers Cost-Efficient Inference at Scale With AWS",
    description:
      "Dynamo adds support for AWS services, unlocking new levels of performance, scalability, and cost-efficiency for serving large language models.",
    imageUrl:
      "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374/item_1670311956184.coreimg.100.410.jpeg/1754413892924/dynamo-aws-sfg.jpeg",

    link: "https://developer.nvidia.com/blog/nvidia-dynamo-adds-support-for-aws-services-to-deliver-cost-efficient-inference-at-scale/",
  },
  {
    category: "Artificial Intelligence",
    type: "Blog",
    title:
      "RTX AI Garage: Langflow Enables Local AI Agent Creation on NVIDIA RTX PCs",
    description:
      "Simple drag-and-drop AI workflow designs are powered by open-source models and RTX acceleration.",
    imageUrl:
      "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374/item_1722277565106_c.coreimg.100.410.jpeg/1754413893156/langflow-nv-sfg-2560x1440.jpeg",
    link: "https://blogs.nvidia.com/blog/rtx-ai-garage-langflow-agents-remix",
  },
];

/**
 * Array of Design & Simulation related data for display in the application.
 *
 * Each object contains metadata and content, including:
 * ```category, type, title, description, imageUrl, 
 **/
const DesignSimulationData = [
  {
    title: "Design and Simulation",
    description: "NVIDIA RTX™ and NVIDIA Omniverse™ deliver the performance to help professionals, creators, developers, and students worldwide enhance creative workflows and build, operate, and connect metaverse applications.",
    links: [
      {
        url: "https://store.nvidia.com/en-us/nvidia-rtx/store/?page=1&limit=9&locale=en-us",
        label: "Shop"
      },
      {
        url: "https://blogs.nvidia.com/blog/category/pro-graphics/",
        label: "Newsroom"
      },
      {
        url: "https://www.nvidia.com/en-us/design-visualization/",
        label: "Professionals"
      },
      {
        url: "https://www.nvidia.com/en-us/omniverse/",
        label: "Creators"
      },
      {
        url: "https://developer.nvidia.com/rtx",
        label: "Developers"
      },
      {
        url: "https://www.nvidia.com/en-us/research/",
        label: "Researchers"
      },
      {
        url: "https://www.nvidia.com/en-us/design-visualization/solutions/cloud-xr/",
        label: "XR"
      }
    ]
  },
  {
    category: "Simulation",
    type: "Blog",
    title: "Unilever Enhances Product Imagery Production With Digital Twins",
    description:
      "Learn how Unilever uses digital twins and NVIDIA Omniverse™ to enhance product imagery.",
    imageUrl:
      "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/Copy%20of%20nv_carousel_10568374/nv_teaser_copy_2006776514.coreimg.100.410.jpeg/1754413893969/unilever-sfg.jpeg",

    link: "https://www.nvidia.com/en-us/customer-stories/unilever/",

  },
  {
    category: "Simulation",
    type: "Event",
    title: "OpenUSD Day at SIGGRAPH 2025",
    description:
      "Join us August 13 to learn how developers and industry pioneers are adopting OpenUSD for every application, from content creation and simulation to industrial AI and robotics.",
    imageUrl:
      "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/Copy%20of%20nv_carousel_10568374/item_1717141705488.coreimg.100.410.jpeg/1754413894280/siggraph-25-special-days-openusd-ari-1920x1080.jpeg",

    link: "https://s2025.conference-schedule.org/session/?sess=sess481",

  },
  {
    category: "Simulation",
    type: "Blog",
    title: "How Global Brands Are Scaling Personalized Advertising",
    description:
      "Marketing leaders are accelerating content pipelines with solutions built using OpenUSD, NVIDIA Omniverse, and agentic AI.",
    imageUrl:
      "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/Copy%20of%20nv_carousel_10568374/nv_teaser_copy_copy.coreimg.100.410.jpeg/1754413894322/nv-ov-ito-july25-social-1920x1080.jpeg",

    link: "https://blogs.nvidia.com/blog/personalized-advertising-ai-3d-content-generation",

  },
  {
    category: "Simulation",
    type: "Customer Story",
    title: "Accelerating Content Production for Leading Global Brands",
    description:
      "Learn how Grip, built on NVIDIA Omniverse, helps Moët Hennessy, Coca-Cola, and Beiersdorf accelerate content production across markets.",
    imageUrl:
      "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/Copy%20of%20nv_carousel_10568374/item_1676348880688.coreimg.100.410.jpeg/1754413894619/grip-customer-story-sfg.jpeg",

    link: "https://www.nvidia.com/en-us/customer-stories/grip/",

  },
  {
    category: "Simulation",
    type: "Blog",
    title: "World Foundation Models Boost AV Simulation and Safety",
    description:
      "Advanced AI and OpenUSD accelerate safe, scalable autonomous vehicle development by enabling simulation-first approaches.",
    imageUrl:
      "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/Copy%20of%20nv_carousel_10568374/item_1669209935575.coreimg.100.410.jpeg/1754413894809/nv-ov-june-ito-social-1920x1080.jpeg",

    link: "https://blogs.nvidia.com/blog/wfm-advance-av-sim-safety/",

  },
  {
    category: "Simulation",
    type: "Blog",
    title: "NVIDIA Expands Omniverse Blueprint for AI Factory Digital Twins",
    description:
      "NVIDIA's expanded Omniverse Blueprint for AI factory design and operation features deeper integrations across the AI factory power, cooling, and networking ecosystem.",
    imageUrl:
      "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/Copy%20of%20nv_carousel_10568374/item_1669209933306.coreimg.100.410.jpeg/1754413895127/nvidia-omniverse-blueprint-for-ai-factory-sfg.jpeg",

    link: "https://blogs.nvidia.com/blog/omniverse-blueprint-ai-factories-expands",


  },
  {
    category: "Simulation",
    type: "Blog",
    title: "Enhance CFD Simulation With OpenUSD Digital Twins",
    description:
      "Leading solution providers are delivering real-time physical digital twins with OpenUSD, RTX, and NVIDIA Blackwell.",
    imageUrl:
      "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/Copy%20of%20nv_carousel_10568374/nv_teaser_copy.coreimg.100.410.jpeg/1754413895432/nvidia-omniverse-ito-may25-sfg.jpeg",

    link: "https://blogs.nvidia.com/blog/computational-fluid-dynamics-digital-twins/",


  },
  {
    category: "Simulation",
    type: "Blog",
    title: "How OpenUSD And Digital Twins Are Scaling Industrial AI",
    description:
      "Industrial AI leaders are using OpenUSD and the Mega Omniverse Blueprint to simulate robot fleets in enterprise facility digital twins.",
    imageUrl:
      "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/Copy%20of%20nv_carousel_10568374/item_1669209928773.coreimg.100.410.jpeg/1754413895738/nvidia-omniverse-ito-april25-sfg.jpeg",

    link: "https://blogs.nvidia.com/blog/how-digital-twins-scale-industrial-ai",


  },
];

/**
 * Array of HPC (High Performance Computing) related data for display in the application.
 *
 * Each object contains metadata and content, including:
 * ```category, type, title, description, imageUrl, 
 **/
const HPCData = [
  {
    title: "High-Performance Computing",
    description: "High-performance computing (HPC) is the ability to process data and perform complex calculations at high speeds. HPC is one of the most essential tools fueling the advancement of computational science.",
    links: [
      { label: "HPC Overview", url: "https://www.nvidia.com/en-us/high-performance-computing/" },
      { label: "SC24 Event", url: "https://www.nvidia.com/en-us/events/supercomputing/" },
      { label: "Supercomputing", url: "https://www.nvidia.com/en-us/lp/high-performance-computing/hpc-ai-cloud-computing-ebook/" },
      { label: "Healthcare", url: "https://www.nvidia.com/en-us/industries/healthcare-life-sciences/" },
      { label: "Public Sector", url: "https://www.nvidia.com/en-us/industries/public-sector/" },
      { label: "Energy", url: "https://www.nvidia.com/en-us/industries/energy/" },
      { label: "NVIDIA HPC SDK", url: "https://developer.nvidia.com/hpc-sdk" },
      { label: "NVIDIA PhysicsNeMo", url: "https://developer.nvidia.com/physicsnemo" },
    ]
  },
  {
    category: "HPC",
    type: "Announcement",
    title: "NVIDIA and Ansys Advance Quantum Algorithms for Fluid Dynamics",
    description: "NVIDIA CUDA-Q running on the Gefion supercomputer enables new engineering applications for quantum computing.",
    imageUrl: "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374_662431768/item_1678778522015.coreimg.100.410.jpeg/1754413896814/nvidia-quantum-computing-sfg.jpeg",

    link: "https://blogs.nvidia.com/blog/ansys-dcai-quantum-computing/",

  },
  {
    category: "HPC",
    type: "Blog",
    title: "NVL72 GB200 Powers the Future for Quantum Computing",
    description: "NVIDIA accelerates workloads spanning quantum computing research.",
    imageUrl: "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374_662431768/nv_teaser_copy_copy_.coreimg.100.410.jpeg/1754413897005/gb200-sfg.jpeg",

    link: "https://blogs.nvidia.com/blog/journey-to-quantum-computing/",

  },
  {
    category: "HPC",
    type: "Announcement",
    title: "NVIDIA Powers Europe's Fastest Supercomputer",
    description: "NVIDIA Grace Hopper platform boosts simulation and training on the Jülich JUPITER supercomputer.",
    imageUrl: "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374_662431768/item_1730558280916.coreimg.100.410.jpeg/1754413897263/nvidia-europe-fastest-supercomputer-sfg.jpeg",

    link: "https://nvidianews.nvidia.com/news/nvidia-powers-europes-fastest-supercomputer",


  },
  {
    category: "HPC",
    type: "Blog",
    title: "The Blue Lion Supercomputer Will Run on NVIDIA Vera Rubin",
    description: "NVIDIA and partners advance astronomical discovery with next-generation computing power.",
    imageUrl: "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374_662431768/nv_teaser_copy_20067.coreimg.100.410.jpeg/1754413897304/blue-lion-sfg.jpeg",

    link: "https://blogs.nvidia.com/blog/vera-rubin-blue-lion-supercomputer/",

  },
  {
    category: "HPC",
    type: "Blog",
    title: "NVIDIA Unveils Earth-2 AI Climate Foundation Model",
    description: "This first-of-its-kind generative AI model is set to transform climate modeling and analytics.",
    imageUrl: "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374_662431768/item_1731658011588.coreimg.100.410.jpeg/1754413897600/nvidia-earth2-sfg.jpeg",

    link: "https://blogs.nvidia.com/blog/earth2-generative-ai-foundation-model-global-climate-kilometer-scale-resolution",

  },
  {
    category: "HPC",
    type: "Announcement",
    title: "New DOE Supercomputer Designed to Accelerate Science",
    description: "Advanced computing infrastructure supports breakthrough scientific research and discovery.",
    imageUrl: "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374_662431768/item_1715357004595.coreimg.100.410.jpeg/1754413897616/nvidia-doudna-sfg.jpeg",

    link: "https://blogs.nvidia.com/blog/doe-supercomputer-doudna/",

  },
  {
    category: "HPC",
    type: "Announcement",
    title: "NVIDIA Powers World's Largest Quantum Research Supercomputer",
    description: "Cutting-edge quantum research capabilities enabled by NVIDIA's advanced computing platform.",
    imageUrl: "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374_662431768/item_1706106769086.coreimg.100.410.jpeg/1754413897632/nvidia-aist-quantum-computing-ari.jpeg",

    link: "https://blogs.nvidia.com/blog/nvidia-aist-quantum-supercomputer/",

  },
  {
    category: "HPC",
    type: "Announcement",
    title: "Semiconductor Industry Accelerates Electronic Design Automation With NVIDIA Blackwell and CUDA-X",
    description: "Next-generation computing platforms drive innovation in semiconductor design and manufacturing.",
    imageUrl: "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374_662431768/item_1688383615216.coreimg.100.410.jpeg/1754413897672/eda-corp-blog-computex25-ari.jpeg",

    link: "https://blogs.nvidia.com/blog/semiconductor-eda-nvidia-blackwell-cuda-x/",

  },
  {
    category: "HPC",
    type: "Announcement",
    title: "NVIDIA to Build Accelerated Quantum Computing Research Center",
    description: "Advancing quantum computing research through state-of-the-art computational infrastructure.",
    imageUrl: "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374_662431768/nv_teaser_copy_copy.coreimg.100.410.jpeg/1754413897688/nvaqc-sfg.jpeg",

    link: "https://blogs.nvidia.com/blog/nvidia-quantum-computing-research-center/",

  },
  {
    category: "Artificial Intelligence",
    type: "Announcement",
    title: "Pioneering Innovation in Autonomous Imaging",
    description: "NVIDIA and GE HealthCare collaborate to advance the development of autonomous diagnostic imaging with NVIDIA Physical AI.",
    imageUrl: "https://www.nvidia.com/content/nvidiaGDC/us/en_US/home/_jcr_content/root/responsivegrid/nv_carousel_10568374_662431768/nv_teaser_copy.coreimg.100.410.jpeg/1754413897945/nvidia-and-ge-healthcare-build-physical-ai-for-next-gen-robotics.jpeg",

    link: "https://nvidianews.nvidia.com/news/nvidia-and-ge-healthcare-collaborate-to-advance-the-development-of-autonomous-diagnostic-imaging-with-physical-ai",

  }
];

/**
 * Footer navigation data for the NVIDIA website footer
 */
const FooterData = {
  companyInfo: [
    { name: "About Us", url: "https://www.nvidia.com/en-us/about-nvidia/" },
    { name: "Company Overview", url: "https://images.nvidia.com/aem-dam/Solutions/homepage/pdf/NVIDIA-Story.pdf" },
    { name: "Investors", url: "https://investor.nvidia.com/home/default.aspx" },
    { name: "Venture Capital (NVentures)", url: "https://www.nventures.ai" },
    { name: "NVIDIA Foundation", url: "https://www.nvidia.com/en-us/foundation/" },
    { name: "Research", url: "https://www.nvidia.com/en-us/research/" },
    { name: "Corporate Sustainability", url: "https://www.nvidia.com/en-us/sustainability/" },
    { name: "Technologies", url: "https://www.nvidia.com/en-us/technologies/" },
    { name: "Careers", url: "https://www.nvidia.com/en-us/about-nvidia/careers/" }
  ],
  newsEvents: [
    { name: "Newsroom", url: "https://nvidianews.nvidia.com/" },
    { name: "Company Blog", url: "https://blogs.nvidia.com/" },
    { name: "Technical Blog", url: "https://developer.nvidia.com/blog/" },
    { name: "Webinars", url: "https://www.nvidia.com/en-us/about-nvidia/webinar-portal/" },
    { name: "Stay Informed", url: "https://www.nvidia.com/en-us/preferences/email-signup/" },
    { name: "Events Calendar", url: "https://www.nvidia.com/en-us/events/" },
    { name: "GTC AI Conference", url: "https://www.nvidia.com/gtc/events/" },
    { name: "NVIDIA On-Demand", url: "https://www.nvidia.com/en-us/on-demand/" }
  ],
  popularLinks: [
    { name: "Developers", url: "https://developer.nvidia.com/" },
    { name: "Partners", url: "https://www.nvidia.com/en-us/about-nvidia/partners/" },
    { name: "Executive Insights", url: "https://www.nvidia.com/en-us/executive-insights/" },
    { name: "Startups and VCs", url: "https://www.nvidia.com/en-us/startups/" },
    { name: "NVIDIA Connect for ISVs", url: "https://www.nvidia.com/en-us/programs/isv/" },
    { name: "Documentation", url: "https://docs.nvidia.com/" },
    { name: "Technical Training", url: "https://www.nvidia.com/en-us/training/" },
    { name: "Training for IT Professionals", url: "https://academy.nvidia.com/en/" },
    { name: "Professional Services for Data Science", url: "https://www.nvidia.com/en-us/support/enterprise/advisory-services/" }
  ],
  socialLinks: [
    { name: "Facebook", url: "https://www.facebook.com/NVIDIA", icon: "fa-facebook-f" },
    { name: "Instagram", url: "https://www.instagram.com/nvidia/?hl=en", icon: "fa-instagram" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/nvidia/", icon: "fa-linkedin-in" },
    { name: "Twitter", url: "https://twitter.com/nvidia", icon: "fa-twitter" },
    { name: "YouTube", url: "https://www.youtube.com/user/nvidia", icon: "fa-youtube" }
  ],
  legalLinks: [
    { name: "Privacy Policy" },
    { name: "Manage My Privacy" },
    { name: "Do Not Sell or Share My Data" },
    { name: "Terms of Service" },
    { name: "Accessibility" },
    { name: "Corporate Policies" },
    { name: "Product Security" },
    { name: "Contact" }
  ]
};


const BannerData = [
  {
    label: "Artificial Intelligence",
    title: "OpenAI, NVIDIA Propel AI Innovation With New Optimized Open Models",
    subtitle: "",
    description: "NVIDIA delivers industry-leading gpt-oss-120b performance of 1.5 tokens per second on a single NVIDIA Blackwell GB200 NVL72 system, optimized for the world’s largest AI inference infrastructure.",
    image: "assets/openai-nvidia-wmfg-multi-img-l.jpg",
    buttonText: "Read Blog",
    color: "#000000",
  },
  {
    label: "Special Address",
    title: "NVIDIA Research Special Address at SIGGRAPH",
    subtitle: "Monday, August 11, 4-5 p.m. PT",
    description: "Join NVIDIA AI research leaders as they chart the next frontier in computer graphics and physical AI.",
    image: "assets/siggraph-special-address-wmfg-multi-img-l.jpg",
    buttonText: "Learn More",
     color: "#000000",
  },
  {
    label: "Artificial Intelligence",
    title: "NVIDIA Accelerates OpenAI gpt-oss Models for Industry Leading Inference",
    subtitle: "",
    description: "Delivering 1.5 M TPS Inference on NVIDIA GB200 NVL72, NVIDIA accelerates OpenAI gpt-oss models enabling faster, more cost-effective AI inference deployment—from cloud to edge.",
    image: "assets/orangina-open-model-smart-inference-wmfg-offset-l.jpg",
    buttonText: "Learn More",
     color: "#013966",
  },
  {
    label: "Artificial Intelligence",
    title: "OpenAI’s New Open-Source Models Accelerated on RTX AI PCs",
    subtitle: "",
    description: "Groundbreaking open-weight models are now available with local optimizations for NVIDIA GeForce RTX and RTX PRO GPUs.",
    image: "assets/project-rtx-ai-bm-wmfg770-l.jpg",
    buttonText: "Learn More",
     color: "#000000",
  },
  {
    label: "Artificial Intelligence",
    title: "Europe Builds AI Infrastructure With NVIDIA",
    subtitle: "",
    description: "NVIDIA Blackwell to accelerate the next industrial transformation and scale sovereign AI.",
    image: "assets/gtc-25-paris-cloud-partner-pr-wmfg-multi-img-l.jpg",
    buttonText: "Read Announcement",
     color: "#000000",
  },
  {
    label: "Artificial Intelligence",
    title: "Driving Europe’s Leap Into AI With Model Builders and Cloud Providers",
    subtitle: "",
    description: "With NVIDIA Nemotron™, Europe’s AI leaders are optimizing their models, which will be available on Perplexity as NVIDIA NIM™ and can run on NVIDIA Cloud Partner AI infrastructure.",
    image: "assets/nvidia-nemotron-wmfg-multi-img-l.jpg",
    buttonText: "Read Press Release",
     color: "#000000",
  }
]


const RecommendationData = [
  {
    url: "https://www.nvidia.com/en-tw/gtc/keynote/",
    imageUrl: "https://www.nvidia.com/content/dam/en-zz/Solutions/homepage/v2/sfg/cptx25-keynote-sfg-1920x1080-enUS-3752950.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png",

    pretitle: "Keynote | Event",
    title: "NVIDIA CEO Jensen Huang Takes the Stage at COMPUTEX 2025"
  },
  {
    url: "https://www.nvidia.com/gtc/keynote/",
    imageUrl: "https://www.nvidia.com/content/dam/en-zz/Solutions/homepage/v2/sfg/gtc25-phase3-keynote-ari.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png",

    pretitle: "NVIDIA GTC | Event",
    title: "GTC Keynote With NVIDIA CEO Jensen Huang"
  },
  {
    url: "https://developer.nvidia.com/blog/advancing-robot-learning-perception-and-manipulation-with-latest-nvidia-isaac-release/",
    imageUrl: "https://www.nvidia.com/content/dam/en-zz/Solutions/homepage/v2/sfg/nvidia-isaac-ai-robot-development.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png",

    pretitle: "Robotics | Blog",
    title: "Isaac Platform Update Brings Enhanced AI Robot Capabilities"
  },
  {
    url: "https://s2025.conference-schedule.org/session/?sess=sess481",
    imageUrl: "https://www.nvidia.com/content/dam/en-zz/Solutions/homepage/v2/sfg/siggraph-25-special-days-openUSD-ari-1920x1080.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png",

    pretitle: "Simulation | Event",
    title: "OpenUSD Day at SIGGRAPH 2025"
  },
  {
    url: "https://blogs.nvidia.com/blog/european-robot-makers-isaac-omniverse-halos-safe-physical-ai",
    imageUrl: "https://www.nvidia.com/content/dam/en-zz/Solutions/homepage/v2/sfg/european-robot-makers-sfg.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png",

    pretitle: "Robotics | Blog",
    title: "European Companies Adopt NVIDIA to Develop AI-Driven Robots"
  },
  {
    url: "https://www.nvidia.com/en-in/geforce/broadcasting/broadcast-app/",
    imageUrl: "https://www.nvidia.com/content/dam/en-zz/Solutions/homepage/v2/sfg/Broadcast-nv-sfg-thumbnail-1920x1080.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png",

    pretitle: "Livestreaming | Product",
    title: "NVIDIA Broadcast Update Available Now"
  },
  {
    url: "https://www.nvidia.com/en-us/data-center/dgx-b300/",
    imageUrl: "https://www.nvidia.com/content/dam/en-zz/Solutions/homepage/v2/sfg/nvidia-dgx-gb300-sfg.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png",

    pretitle: "Data Center | Product",
    title: "Introducing NVIDIA DGX B300"
  },
  {
    url: "https://www.youtube.com/watch?v=K6t4tusFZ5c",
    imageUrl: "https://www.nvidia.com/content/dam/en-zz/Solutions/homepage/v2/sfg/nvidia-nv-story-ai-factory-sfg.jpeg/jcr:content/renditions/cq5dam.thumbnail.319.319.png",

    pretitle: "Artificial Intelligence | Video",
    title: "The AI Factory"
  }
];

// Make variables available globally
window.AiData = AiData;
window.DesignSimulationData = DesignSimulationData;
window.HPCData = HPCData;
window.FooterData = FooterData;
window.BannerData = BannerData;
window.RecommendationData = RecommendationData;


