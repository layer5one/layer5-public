const models = {
    'historical': {
        title: 'Historical Roots (GPT-1 & GPT-2)',
        arch: 'Autoregressive Transformer',
        memory: 'Dense (117M -> 1.5B)',
        interface: 'Hugging Face / Python',
        desc: 'Before OpenAI closed their doors, they famously trained and open-sourced the models that proved scaling dense Transformers was the path to capability. These are the completely raw, unfiltered, alignment-free base models from 2018 and 2019 that started the modern Generative AI race.',
        install: {
            'tier1': `cd historical/
chmod +x install.sh
./install.sh

source history_env/bin/activate

# To run the original 117M parameter GPT-1
python chat.py --model gpt1

# To run the infamous 1.5B parameter GPT-2 XL
python chat.py --model gpt2-xl`,
            'tier2': `cd historical/
chmod +x install.sh
./install.sh

source history_env/bin/activate

# To run the original 117M parameter GPT-1
python chat.py --model gpt1

# If running the 1.5B GPT-2 XL on an 8GB card, use the --quant flag
python chat.py --model gpt2-xl --quant`,
            'tier3': `# CPU-Only Scavenger Mode

cd historical/
chmod +x install.sh
./install.sh

source history_env/bin/activate

# The 117M GPT-1 will run fine purely on system RAM
python chat.py --model gpt1

# Do NOT attempt to run the 1.5B GPT-2 XL directly in Python on a CPU.
# Instead, download LM Studio and search for: "TheBloke/gpt2-xl-GGUF"`
        },
        tierWarnings: {
            'tier1': 'Tier 1 Specs: You can comfortably load the enormous 1.5B parameter GPT-2 XL into VRAM.',
            'tier2': 'Tier 2 Specs: You will likely need to use --quant 8bit to comfortably fit the 1.5B GPT-2 XL into your VRAM.',
            'tier3': 'Tier 3 Specs: The 117M GPT-1 runs perfectly on CPU. You must use GGUF offloading for the 1.5B GPT-2 XL.'
        }
    },
    'rwkv': {
        title: 'RWKV (Receptance Weighted Key Value)',
        arch: 'RNN',
        memory: 'O(1) Linear',
        interface: 'RWKV Runner',
        desc: 'RWKV is an RNN with Transformer-level performance. It completely drops the KV cache, meaning inference uses a fixed amount of VRAM regardless of how long the context window gets.',
        install: {
            'tier1': `# The easiest approach is the official RWKV Runner GUI:
# Download: https://github.com/josStorer/RWKV-Runner/releases

# Or deploy via Python transformers:
git clone https://github.com/BlinkDL/ChatRWKV
cd ChatRWKV
pip install -r requirements.txt
python chat.py`,
            'tier2': `# The easiest approach is the official RWKV Runner GUI:
# Download: https://github.com/josStorer/RWKV-Runner/releases

# Or deploy via Python transformers:
git clone https://github.com/BlinkDL/ChatRWKV
cd ChatRWKV
pip install -r requirements.txt
python chat.py`,
            'tier3': `# For low-end devices, avoid the Python implementation.
# Use the highly optimized Ai00 Server (Vulkan/CPU):
# Download: https://github.com/cgisky1980/ai00_rwkv_server/releases

# Alternatively, configure the standard RWKV-Runner to use CPU offloading.`
        },
        tierWarnings: {
            'tier1': 'Tier 1 Specs: You can comfortably run the massive 14B model.',
            'tier2': 'Tier 2 Specs: Stick to the 3B or 7B models.',
            'tier3': 'Tier 3 Specs: Download the Ai00 Server binaries for optimized Vulkan/CPU execution.'
        }
    },
    'ssm-mamba': {
        title: 'Mamba (State Space Model)',
        arch: 'SSM',
        memory: 'O(1) Linear',
        interface: 'Transformers / MLX',
        desc: 'Mamba uses a selective state space model mechanism to filter information. Like RWKV, it drops the massive memory footprint of a transformer KV cache while matching or beating Transformer performance at the same scale.',
        install: {
            'tier1': `cd ssm-mamba/
chmod +x install.sh
./install.sh

source mamba_env/bin/activate
python chat.py`,
            'tier2': `cd ssm-mamba/
chmod +x install.sh
./install.sh

source mamba_env/bin/activate
python chat.py`,
            'tier3': `# For CPU-only, bypass Python and use LM Studio or llama.cpp.
# Search huggingface for Mamba GGUF variants.
#
# If you must use Python, stick to the tiny 130M model:
cd ssm-mamba/
./install.sh
source mamba_env/bin/activate
python chat.py`
        },
        tierWarnings: {
            'tier1': 'Tier 1 Specs: You can run any Mamba checkpoint comfortably.',
            'tier2': 'Tier 2 Specs: 1.4B and 2.8B models will fit well in 8GB VRAM.',
            'tier3': 'Tier 3 Specs: Only run the 130M parameter model in Python, or use Llama.cpp for anything larger.'
        }
    },
    'liquid': {
        title: 'Liquid Foundation Models (LFMs)',
        arch: 'Continuous Dynamical System',
        memory: 'Highly Optimized Edge',
        interface: 'Llama.cpp / Mac MLX',
        desc: 'Traditional Neural Networks have static weights. LFMs are continuous-time systems where hidden states flow based on sequence inputs. They are incredibly memory efficient and designed specifically for Edge hardware.',
        install: {
            'tier1': `cd liquid/
chmod +x install.sh
./install.sh

source liquid_env/bin/activate

# TIER 1 ONLY: The 24B Parameter Model (Requires 4-bit Quantization)
python chat.py --model "LiquidAI/LFM2-24B-A2B" --quant 4bit`,
            'tier2': `cd liquid/
chmod +x install.sh
./install.sh

source liquid_env/bin/activate
# Standard Active-Memory Model
python chat.py --model "LiquidAI/LFM2.5-1.2B-Instruct"`,
            'tier3': `# Best run via System RAM using LM Studio or llama.cpp CLI.
# Search Hugging Face for "LFM2.5-1.2B-Instruct-GGUF"
# and load the Q4 or Q8 quantized file entirely into system RAM.`
        },
        tierWarnings: {
            'tier1': 'Tier 1 Specs: Use the CLI argument --quant 4bit to run the massive 24B model.',
            'tier2': 'Tier 2 Specs: The 1.2B and 3B models run perfectly. Use MLX on Mac.',
            'tier3': 'Tier 3 Specs: Do not use the Python script. Use LM Studio to run the 1.2B .gguf purely on System RAM for 15+ tokens/s.'
        }
    },
    'matmul-free': {
        title: 'MatMul-Free Language Modeling',
        arch: 'Ternary Weights',
        memory: 'EXTREME Edge',
        interface: 'Custom Transformers',
        desc: 'The MatMul-Free architecture eliminates Matrix Multiplication entirely by forcing weights into ternary states (-1, 0, 1), requiring purely addition. It reduces memory usage by over 10x compared to Transformers.',
        install: {
            'tier1': `cd matmul-free/
chmod +x install.sh
./install.sh

source matmul_env/bin/activate
python chat.py`,
            'tier2': `cd matmul-free/
chmod +x install.sh
./install.sh

source matmul_env/bin/activate
python chat.py`,
            'tier3': `cd matmul-free/
chmod +x install.sh
./install.sh

source matmul_env/bin/activate
python chat.py`
        },
        tierWarnings: {
            'tier1': 'Hardware independent: This is an academic research demonstration.',
            'tier2': 'Hardware independent: This is an academic research demonstration.',
            'tier3': 'Hardware independent: This is an academic research demonstration.'
        }
    },
    'hybrid': {
        title: 'Hybrid Architectures (Jamba & RecurrentGemma)',
        arch: 'Transformer + RNN/SSM',
        memory: 'Hybrid Scaling',
        interface: 'Transformers',
        desc: 'Hybrids interleave Transformer Attention layers with Mamba or Griffin RNN layers. This gives the model the exact factual recall of a Transformer while maintaining the massive memory efficiency of an RNN.',
        install: {
            'tier1': `cd hybrid/
chmod +x install.sh
./install.sh

source hybrid_env/bin/activate
# Note: google/recurrentgemma-2b-it is gated.
# You MUST run 'huggingface-cli login' first.
python chat.py`,
            'tier2': `cd hybrid/
chmod +x install.sh
./install.sh

source hybrid_env/bin/activate
# Note: google/recurrentgemma-2b-it is gated.
# You MUST run 'huggingface-cli login' first.
python chat.py`,
            'tier3': `# For CPU Scavenger tier, avoid RecurrentGemma in Python.
# Download LM Studio or Llama.cpp and search for "Jamba-v0.1-GGUF"
# Run pure offloaded system RAM inference.`
        },
        tierWarnings: {
            'tier1': 'Tier 1 Specs: You can run the massive AI21 Jamba models.',
            'tier2': 'Tier 2 Specs: Stick to the 2B parameter RecurrentGemma.',
            'tier3': 'Tier 3 Specs: Hardware limited. Expect very slow inference unless heavily quantized via GGUF.'
        }
    },
    'retnet': {
        title: 'RetNet (Retentive Network)',
        arch: 'Retention Mechanism',
        memory: 'O(1) Inference',
        interface: 'Custom Transformers',
        desc: 'RetNet replaces Softmax Attention with a Retention mechanism, allowing it to be trained in parallel like a Transformer, but run inference as an RNN without caching historical states.',
        install: {
            'tier1': `cd retnet/
chmod +x install.sh
./install.sh

source retnet_env/bin/activate
python chat.py`,
            'tier2': `cd retnet/
chmod +x install.sh
./install.sh

source retnet_env/bin/activate
python chat.py`,
            'tier3': `cd retnet/
chmod +x install.sh
./install.sh

source retnet_env/bin/activate
python chat.py`
        },
        tierWarnings: {
            'tier1': 'Currently only 120M research checkpoints exist.',
            'tier2': 'Currently only 120M research checkpoints exist.',
            'tier3': 'Currently only 120M research checkpoints exist.'
        }
    },
    'diffusion': {
        title: 'Plamo / Text-Based Diffusion',
        arch: 'Diffusion-LM',
        memory: 'Intensive',
        interface: 'GGUF / Llama.cpp',
        desc: 'Instead of predicting tokens left-to-right autoregressively, Diffusion language models start with pure noise and "denoise" the entire paragraph of text simultaneously. A fascinating glimpse at non-autoregressive AI.',
        install: {
            'tier1': `# Diffusion topologies are hard to run natively.
# Use LM Studio/Llama.cpp with quantized GGUF implementations:
#
# Search Hugging Face for: tensorblock/plamo-13b-GGUF
# Or: mradermacher/plamo-13b-GGUF`,
            'tier2': `# Diffusion topologies are hard to run natively.
# Use LM Studio/Llama.cpp with quantized GGUF implementations:
#
# Search Hugging Face for: tensorblock/plamo-13b-GGUF`,
            'tier3': `# Hardware Limited.
# Running a 13B Text-Diffusion model on CPU will be extremely slow.
# Search Hugging Face for: tensorblock/plamo-13b-GGUF`
        },
        tierWarnings: {
            'tier1': 'Tier 1 Required for testing experimental diffusion topologies.',
            'tier2': 'Hardware limited for experimental diffusion layers.',
            'tier3': 'Hardware limited for experimental diffusion layers.'
        }
    },
    'audio-native': {
        title: 'Audio-Native (Moshi & Qwen2-Audio)',
        arch: 'Multimodal Audio LLM',
        memory: 'Heavy (7B+ typical)',
        interface: 'Transformers / WebSockets',
        desc: 'These models bypass speech-to-text entirely. They input raw audio waveforms and output raw audio waveforms simultaneously, allowing them to understand tone, interrupt humans, and speak over you just like a real person.',
        install: {
            'tier1': `cd audio-native/
chmod +x install.sh
./install.sh

source audio_env/bin/activate

# For traditional turn-based Audio Chat (Qwen2):
python chat.py

# For real-time Moshi interruptions (WebSockets - BF16):
python -m moshi.server --model hf://kyutai/moshika-pytorch-bf16`,
            'tier2': `cd audio-native/
chmod +x install.sh
./install.sh

source audio_env/bin/activate

# For traditional turn-based Audio Chat (Qwen2):
python chat.py

# For real-time Moshi interruptions (WebSockets - BF16):
python -m moshi.server --model hf://kyutai/moshika-pytorch-bf16`,
            'tier3': `cd audio-native/
chmod +x install.sh
./install.sh

source audio_env/bin/activate

# For CPU-Only setups, you MUST use the Q4 quantized Moshi weights
# otherwise the audio will severely stutter and crash.
python -m moshi.server --model hf://kyutai/moshika-pytorch-q4`
        },
        tierWarnings: {
            'tier1': 'Tier 1 Specs: Fully supported. Enjoy real-time latency.',
            'tier2': 'Tier 2 Specs: You may experience latency or lag responding to voice.',
            'tier3': 'Tier 3 Specs: Instructed to use kyutai/moshika-pytorch-q4 for CPU.'
        }
    },
    'robotics': {
        title: 'Robotics (VLA & Action Models)',
        arch: 'Action Diffusion / ACT',
        memory: 'Varies',
        interface: 'LeRobot Framework',
        desc: 'Vision-Language-Action (VLA) models don\'t just output words—they output X, Y, Z joint coordinates to command physical motors. We cover LeRobot and the "Scrap Robotics" approach for DIY physical actuation.',
        install: {
            'tier1': `cd robotics/
chmod +x install.sh
./install.sh

source lerobot_env/bin/activate

# Run the conceptual Action trajectory simulator
python simulate.py`,
            'tier2': `cd robotics/
chmod +x install.sh
./install.sh

source lerobot_env/bin/activate

# Run the conceptual Action trajectory simulator
python simulate.py`,
            'tier3': `cd robotics/
chmod +x install.sh
./install.sh

source lerobot_env/bin/activate

# Run the conceptual Action trajectory simulator
python simulate.py`
        },
        tierWarnings: {
            'tier1': 'Tier 1 Specs: You can train Action Chunking models locally.',
            'tier2': 'Tier 2 Specs: You can run inference on pre-trained VLA models.',
            'tier3': 'Tier 3 Specs: Use the Pi5 to control servos while networking to a larger GPU.'
        }
    },
    'unobtainables': {
        title: 'The Unobtainables',
        arch: 'Vision Linage / Secret',
        memory: 'N/A',
        interface: 'N/A',
        desc: '<img src="unnamed.jpg" alt="Potion Seller" style="max-width: 250px; border-radius: 8px; margin-bottom: 15px; display: block;"><br>A historical record of models that redefined architecture but never released open weights (such as Meta\'s VL-JEPA or Apple\'s early foundational research).',
        install: {
            'tier1': `# ⚠️ No downloadable weights exist for this lineage.
# These models are locked behind corporate walls or research APIs.
# 
# Please read the historical breakdown in the repository:
cat unobtainables/README.md`,
            'tier2': `# ⚠️ No downloadable weights exist for this lineage.
# These models are locked behind corporate walls or research APIs.
# 
# Please read the historical breakdown in the repository:
cat unobtainables/README.md`,
            'tier3': `# ⚠️ No downloadable weights exist for this lineage.
# These models are locked behind corporate walls or research APIs.
# 
# Please read the historical breakdown in the repository:
cat unobtainables/README.md`
        },
        tierWarnings: {
            'tier1': 'Closed Weights.',
            'tier2': 'Closed Weights.',
            'tier3': 'Closed Weights.'
        }
    }
};

function loadModel(modelKey, clickedEl) {
    // Update active state
    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    if (clickedEl) clickedEl.classList.add('active');

    const model = models[modelKey];
    const tier = document.getElementById('hardware-tier').value;

    // Populate data
    document.getElementById('model-title').innerText = model.title;
    document.getElementById('stat-arch').innerText = model.arch;
    document.getElementById('stat-memory').innerText = model.memory;
    document.getElementById('stat-interface').innerText = model.interface;
    document.getElementById('model-description').innerHTML = `<p>${model.desc}</p>`;

    // Dynamically load the install instructions based on the selected hardware tier
    document.getElementById('install-code').innerText = model.install[tier];

    // Set Tier Warning
    const warningEl = document.getElementById('tier-warning');
    warningEl.innerText = model.tierWarnings[tier];

    // Status Ping Effect
    const statusEl = document.getElementById('model-status');
    statusEl.innerHTML = '<span class="pulse"></span> ONLINE';
    statusEl.style.color = 'var(--success)';
}

// React to hardware tier dropdown changes
document.getElementById('hardware-tier').addEventListener('change', () => {
    // Reload the currently active model to update the warning and install code messages
    const activeItem = document.querySelector('.sidebar li.active');
    if (activeItem) {
        activeItem.click();
    }
});

function copyInstall() {
    const code = document.getElementById('install-code').innerText;
    navigator.clipboard.writeText(code);

    const btn = document.querySelector('.copy-btn');
    const originalText = btn.innerText;
    btn.innerText = 'Copied!';
    btn.style.borderColor = 'var(--success)';
    btn.style.color = 'var(--success)';

    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.borderColor = 'var(--border-color)';
        btn.style.color = 'var(--text-muted)';
    }, 2000);
}
