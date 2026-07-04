/* Module 4 - Multi-qubit systems */
QP.registerModule({
  id: "m4-multiqubit",
  order: 4,
  accent: "#3457C9",
  title: { en: "Multi-qubit systems", vi: "Hệ nhiều qubit" },
  subtitle: {
    en: "Combining qubits with the tensor product, the two-qubit gates that act on them, entanglement and the Bell states, the GHZ state, and the no-cloning theorem.",
    vi: "Ghép các qubit bằng tích tensor, các cổng hai qubit tác động lên chúng, hiện tượng rối và các trạng thái Bell, trạng thái GHZ, và định lý không nhân bản."
  },
  lessons: [
    {
      id: "l1-tensor",
      minutes: 13,
      title: { en: "Two qubits and the tensor product", vi: "Hai qubit và tích tensor" },
      quiz: [
        {
          q: {
            en: "Which is the correct four-dimensional basis for a two-qubit system?",
            vi: "Đâu là cơ sở bốn chiều đúng cho hệ hai qubit?"
          },
          options: [
            { en: "|00⟩, |01⟩, |10⟩, |11⟩", vi: "|00⟩, |01⟩, |10⟩, |11⟩" },
            { en: "|0⟩, |1⟩, |+⟩, |−⟩", vi: "|0⟩, |1⟩, |+⟩, |−⟩" },
            { en: "|00⟩, |11⟩ only", vi: "Chỉ |00⟩, |11⟩" },
            { en: "|0⟩, |1⟩, |2⟩, |3⟩ as independent particles", vi: "|0⟩, |1⟩, |2⟩, |3⟩ như các hạt độc lập" }
          ],
          answer: 0,
          explain: {
            en: "The tensor product of the one-qubit bases {|0⟩,|1⟩} with itself gives the four combined basis states |00⟩=|0⟩⊗|0⟩, |01⟩, |10⟩, |11⟩. Any two-qubit state is a superposition of these four.",
            vi: "Tích tensor của cơ sở một qubit {|0⟩,|1⟩} với chính nó cho bốn trạng thái cơ sở ghép |00⟩=|0⟩⊗|0⟩, |01⟩, |10⟩, |11⟩. Mọi trạng thái hai qubit là chồng chập của bốn cái này."
          }
        },
        {
          q: {
            en: "How many complex amplitudes describe the state of n qubits?",
            vi: "Cần bao nhiêu biên độ phức để mô tả trạng thái của n qubit?"
          },
          options: [
            { en: "2n", vi: "2n" },
            { en: "n²", vi: "n²" },
            { en: "2ⁿ", vi: "2ⁿ" },
            { en: "n", vi: "n" }
          ],
          answer: 2,
          explain: {
            en: "Each added qubit multiplies the dimension of the state space by 2, so n qubits need 2ⁿ amplitudes. This exponential growth is exactly why simulating quantum systems on classical computers is so hard.",
            vi: "Mỗi qubit thêm vào nhân đôi số chiều của không gian trạng thái, nên n qubit cần 2ⁿ biên độ. Sự tăng theo hàm mũ này chính là lý do mô phỏng hệ lượng tử trên máy cổ điển lại khó tới vậy."
          }
        }
      ]
    },
    {
      id: "l2-two-qubit-gates",
      minutes: 13,
      title: { en: "Two-qubit gates: CNOT, CZ, SWAP", vi: "Cổng hai qubit: CNOT, CZ, SWAP" },
      quiz: [
        {
          q: {
            en: "The CNOT gate (control = top qubit) acts on |10⟩. What is the result?",
            vi: "Cổng CNOT (điều khiển = qubit trên) tác động lên |10⟩. Kết quả là gì?"
          },
          options: [
            { en: "|11⟩", vi: "|11⟩" },
            { en: "|10⟩", vi: "|10⟩" },
            { en: "|00⟩", vi: "|00⟩" },
            { en: "|01⟩", vi: "|01⟩" }
          ],
          answer: 0,
          explain: {
            en: "CNOT flips the target (second qubit) only when the control (first qubit) is 1. On |10⟩ the control is 1, so the target 0 flips to 1, giving |11⟩.",
            vi: "CNOT lật bit đích (qubit thứ hai) chỉ khi bit điều khiển (qubit thứ nhất) bằng 1. Với |10⟩ điều khiển là 1, nên đích 0 lật thành 1, cho |11⟩."
          }
        },
        {
          q: {
            en: "What does the SWAP gate do to |01⟩?",
            vi: "Cổng SWAP làm gì với |01⟩?"
          },
          options: [
            { en: "Leaves it as |01⟩", vi: "Giữ nguyên |01⟩" },
            { en: "Turns it into |10⟩", vi: "Biến thành |10⟩" },
            { en: "Turns it into |11⟩", vi: "Biến thành |11⟩" },
            { en: "Adds a minus sign: −|01⟩", vi: "Thêm dấu trừ: −|01⟩" }
          ],
          answer: 1,
          explain: {
            en: "SWAP exchanges the states of the two qubits, so |01⟩ → |10⟩ and |10⟩ → |01⟩, while |00⟩ and |11⟩ are unchanged.",
            vi: "SWAP hoán đổi trạng thái của hai qubit, nên |01⟩ → |10⟩ và |10⟩ → |01⟩, còn |00⟩ và |11⟩ giữ nguyên."
          }
        },
        {
          q: {
            en: "How does CZ (controlled-Z) act on the basis state |11⟩?",
            vi: "CZ (controlled-Z) tác động lên trạng thái cơ sở |11⟩ như thế nào?"
          },
          options: [
            { en: "It gives −|11⟩ (a phase flip on |11⟩ only).", vi: "Cho −|11⟩ (lật pha chỉ với |11⟩)." },
            { en: "It flips |11⟩ to |10⟩.", vi: "Lật |11⟩ thành |10⟩." },
            { en: "It leaves every basis state completely unchanged.", vi: "Giữ nguyên hoàn toàn mọi trạng thái cơ sở." },
            { en: "It swaps the two qubits.", vi: "Hoán đổi hai qubit." }
          ],
          answer: 0,
          explain: {
            en: "CZ applies a Z to the target only when the control is 1. Only |11⟩ has both qubits at 1, and Z maps |1⟩→−|1⟩, so CZ|11⟩ = −|11⟩ and all other basis states are unchanged. Because it fires only on |11⟩, CZ is symmetric in its two qubits.",
            vi: "CZ áp dụng Z lên đích chỉ khi điều khiển bằng 1. Chỉ |11⟩ có cả hai qubit bằng 1, và Z biến |1⟩→−|1⟩, nên CZ|11⟩ = −|11⟩ còn mọi trạng thái cơ sở khác giữ nguyên. Vì chỉ kích hoạt trên |11⟩, CZ đối xứng giữa hai qubit của nó."
          }
        }
      ]
    },
    {
      id: "l3-entanglement",
      minutes: 14,
      title: { en: "Entanglement and the Bell states", vi: "Rối lượng tử và các trạng thái Bell" },
      quiz: [
        {
          q: {
            en: "Why is |Φ+⟩ = (1/√2)(|00⟩ + |11⟩) called entangled?",
            vi: "Vì sao |Φ+⟩ = (1/√2)(|00⟩ + |11⟩) được gọi là trạng thái rối?"
          },
          options: [
            { en: "It cannot be written as a tensor product |a⟩⊗|b⟩ of two single-qubit states.", vi: "Nó không viết được thành tích tensor |a⟩⊗|b⟩ của hai trạng thái một qubit." },
            { en: "Its amplitudes are all equal.", vi: "Các biên độ của nó đều bằng nhau." },
            { en: "It contains a minus sign.", vi: "Nó chứa một dấu trừ." },
            { en: "Because both qubits are in |0⟩.", vi: "Vì cả hai qubit đều ở |0⟩." }
          ],
          answer: 0,
          explain: {
            en: "A state is entangled precisely when it is NOT separable - it cannot be factored into |a⟩⊗|b⟩. For |Φ+⟩ any attempt to factor forces a product with a |01⟩ or |10⟩ term, so no factorization exists.",
            vi: "Một trạng thái là rối đúng khi nó KHÔNG tách được - không phân tích được thành |a⟩⊗|b⟩. Với |Φ+⟩ mọi cố gắng phân tích đều buộc phải sinh ra số hạng |01⟩ hoặc |10⟩, nên không tồn tại cách phân tích."
          }
        },
        {
          q: {
            en: "Which circuit produces the Bell state |Φ+⟩ from the input |00⟩?",
            vi: "Mạch nào tạo trạng thái Bell |Φ+⟩ từ đầu vào |00⟩?"
          },
          options: [
            { en: "Hadamard on qubit 0, then CNOT with qubit 0 as control and qubit 1 as target.", vi: "Hadamard lên qubit 0, rồi CNOT với qubit 0 điều khiển và qubit 1 đích." },
            { en: "CNOT first, then Hadamard on both qubits.", vi: "CNOT trước, rồi Hadamard lên cả hai qubit." },
            { en: "Hadamard on both qubits only.", vi: "Chỉ Hadamard lên cả hai qubit." },
            { en: "A SWAP gate.", vi: "Một cổng SWAP." }
          ],
          answer: 0,
          explain: {
            en: "H on qubit 0 makes (1/√2)(|0⟩+|1⟩)|0⟩ = (1/√2)(|00⟩+|10⟩). CNOT then flips the target when the control is 1, sending |10⟩→|11⟩, giving (1/√2)(|00⟩+|11⟩) = |Φ+⟩.",
            vi: "H lên qubit 0 tạo (1/√2)(|0⟩+|1⟩)|0⟩ = (1/√2)(|00⟩+|10⟩). CNOT sau đó lật đích khi điều khiển bằng 1, đưa |10⟩→|11⟩, cho (1/√2)(|00⟩+|11⟩) = |Φ+⟩."
          }
        },
        {
          q: {
            en: "You share |Φ+⟩ with a distant partner and measure your qubit, getting 0. What can you say about your partner's qubit?",
            vi: "Bạn chia sẻ |Φ+⟩ với một người ở xa và đo qubit của mình, được 0. Bạn nói được gì về qubit của người kia?"
          },
          options: [
            { en: "It will now certainly read 0 when measured in the same basis.", vi: "Khi đo cùng cơ sở, nó chắc chắn sẽ cho 0." },
            { en: "It will certainly read 1.", vi: "Nó chắc chắn sẽ cho 1." },
            { en: "It stays 50/50 independent of your result.", vi: "Nó vẫn 50/50, độc lập với kết quả của bạn." },
            { en: "Your measurement instantly sends them a signal.", vi: "Phép đo của bạn tức thì gửi tín hiệu cho họ." }
          ],
          answer: 0,
          explain: {
            en: "In |Φ+⟩ only the |00⟩ and |11⟩ terms survive, so the two outcomes are perfectly correlated: 0 here means 0 there. But your local result is random and carries no controllable message - so no signal is sent.",
            vi: "Trong |Φ+⟩ chỉ còn hai số hạng |00⟩ và |11⟩, nên hai kết quả tương quan hoàn hảo: bên bạn 0 thì bên kia cũng 0. Nhưng kết quả cục bộ của bạn ngẫu nhiên và không mang thông điệp điều khiển được - nên không có tín hiệu nào được gửi."
          }
        }
      ]
    },
    {
      id: "l4-ghz",
      minutes: 12,
      title: { en: "Bigger entanglement: GHZ and measuring subsystems", vi: "Rối lớn hơn: GHZ và đo hệ con" },
      quiz: [
        {
          q: {
            en: "In the GHZ state (1/√2)(|000⟩ + |111⟩), you measure the first qubit and get 1. What are the other two qubits then?",
            vi: "Trong trạng thái GHZ (1/√2)(|000⟩ + |111⟩), bạn đo qubit đầu và được 1. Hai qubit còn lại khi đó là gì?"
          },
          options: [
            { en: "Both collapse to |1⟩, giving |111⟩.", vi: "Cả hai sập về |1⟩, cho |111⟩." },
            { en: "They stay in superposition, unaffected.", vi: "Chúng vẫn ở chồng chập, không bị ảnh hưởng." },
            { en: "They become (1/√2)(|00⟩+|11⟩).", vi: "Chúng thành (1/√2)(|00⟩+|11⟩)." },
            { en: "One is |0⟩ and one is |1⟩.", vi: "Một cái |0⟩ và một cái |1⟩." }
          ],
          answer: 0,
          explain: {
            en: "Only |000⟩ and |111⟩ appear. Getting 1 on the first qubit rules out the |000⟩ branch, so the whole register collapses to |111⟩ - the remaining two qubits are both certainly 1.",
            vi: "Chỉ có |000⟩ và |111⟩ xuất hiện. Được 1 ở qubit đầu loại bỏ nhánh |000⟩, nên toàn thanh ghi sập về |111⟩ - hai qubit còn lại chắc chắn đều bằng 1."
          }
        },
        {
          q: {
            en: "Can two people sharing an entangled pair use their measurements to send information faster than light?",
            vi: "Hai người chia sẻ một cặp rối có thể dùng phép đo để gửi thông tin nhanh hơn ánh sáng không?"
          },
          options: [
            { en: "No - each side sees only random local outcomes; correlations appear only after comparing results over a classical channel.", vi: "Không - mỗi bên chỉ thấy kết quả cục bộ ngẫu nhiên; tương quan chỉ lộ ra sau khi so kết quả qua một kênh cổ điển." },
            { en: "Yes - the collapse is instantaneous, so a message is sent instantly.", vi: "Có - sự sập là tức thời, nên thông điệp được gửi ngay lập tức." },
            { en: "Yes, but only with GHZ states.", vi: "Có, nhưng chỉ với trạng thái GHZ." },
            { en: "Only if they measure in different bases.", vi: "Chỉ khi họ đo ở các cơ sở khác nhau." }
          ],
          answer: 0,
          explain: {
            en: "Entanglement is a resource for correlation, not communication. The local statistics on each side are unchanged by what the other party does (the no-signalling principle), so no faster-than-light message is possible.",
            vi: "Rối là tài nguyên cho tương quan, không phải cho truyền tin. Thống kê cục bộ mỗi bên không đổi bởi hành động của bên kia (nguyên lý không truyền tín hiệu), nên không thể gửi thông điệp nhanh hơn ánh sáng."
          }
        }
      ]
    },
    {
      id: "l5-no-cloning",
      minutes: 12,
      title: { en: "The no-cloning theorem", vi: "Định lý không nhân bản" },
      quiz: [
        {
          q: {
            en: "What does the no-cloning theorem forbid?",
            vi: "Định lý không nhân bản cấm điều gì?"
          },
          options: [
            { en: "A single unitary that copies an arbitrary unknown quantum state.", vi: "Một cổng unitary duy nhất sao chép một trạng thái lượng tử tuỳ ý chưa biết." },
            { en: "Copying a known state like |0⟩.", vi: "Sao chép một trạng thái đã biết như |0⟩." },
            { en: "Measuring a qubit twice.", vi: "Đo một qubit hai lần." },
            { en: "Entangling two qubits.", vi: "Làm rối hai qubit." }
          ],
          answer: 0,
          explain: {
            en: "The theorem says no single fixed unitary can copy every unknown state. You CAN copy known basis states (CNOT copies |0⟩ and |1⟩); what is impossible is one machine that copies arbitrary superpositions too.",
            vi: "Định lý nói không cổng unitary cố định nào sao chép được mọi trạng thái chưa biết. Bạn VẪN sao chép được các trạng thái cơ sở đã biết (CNOT sao chép |0⟩ và |1⟩); điều bất khả là một cỗ máy sao chép được cả các chồng chập tuỳ ý."
          }
        },
        {
          q: {
            en: "Which property of quantum mechanics is the heart of the no-cloning proof?",
            vi: "Tính chất nào của cơ học lượng tử là cốt lõi của chứng minh không nhân bản?"
          },
          options: [
            { en: "The linearity of unitary evolution.", vi: "Tính tuyến tính của tiến hoá unitary." },
            { en: "The uncertainty principle alone.", vi: "Riêng nguyên lý bất định." },
            { en: "That measurement is random.", vi: "Rằng phép đo là ngẫu nhiên." },
            { en: "That qubits are always in |0⟩.", vi: "Rằng qubit luôn ở |0⟩." }
          ],
          answer: 0,
          explain: {
            en: "Copying is quadratic in the input amplitudes, but unitaries are linear. Assuming a cloner works on |0⟩ and |1⟩ and applying it by linearity to |+⟩ gives the wrong (unentangled) output, a contradiction. Hence no such unitary exists.",
            vi: "Sao chép là bậc hai theo biên độ đầu vào, nhưng unitary lại tuyến tính. Giả sử một cỗ máy sao chép hoạt động trên |0⟩ và |1⟩ rồi áp dụng tuyến tính lên |+⟩ sẽ cho đầu ra sai (không rối), một mâu thuẫn. Vậy không tồn tại unitary như thế."
          }
        }
      ]
    }
  ]
});
