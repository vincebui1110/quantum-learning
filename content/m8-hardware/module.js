/* Module 8 - Hardware and the frontier */
QP.registerModule({
  id: "m8-hardware",
  order: 8,
  accent: "#D4791F",
  title: { en: "Hardware and the frontier", vi: "Phần cứng và biên giới" },
  subtitle: {
    en: "How real qubits are built, why they are fragile, how error correction fights back, and where genuine quantum advantage honestly stands today.",
    vi: "Qubit thật được chế tạo thế nào, vì sao chúng mong manh, sửa lỗi lượng tử chống lại ra sao, và lợi thế lượng tử thực sự đang đứng ở đâu một cách trung thực."
  },
  lessons: [
    {
      id: "l1-physical-qubits",
      minutes: 13,
      title: { en: "How real qubits are built", vi: "Qubit thật được chế tạo thế nào" },
      quiz: [
        {
          q: {
            en: "Superconducting transmon qubits run gates in tens of nanoseconds but have coherence of roughly a millisecond, while trapped ions keep coherence for seconds yet run gates far more slowly. What does this trade-off illustrate?",
            vi: "Qubit siêu dẫn transmon chạy cổng trong vài chục nano-giây nhưng chỉ giữ kết hợp cỡ một mili-giây, còn ion bẫy giữ kết hợp hàng giây nhưng chạy cổng chậm hơn nhiều. Sự đánh đổi này minh hoạ điều gì?"
          },
          options: [
            { en: "There is no single best modality; each platform trades speed, coherence, connectivity, and scalability differently.", vi: "Không có một nền tảng tốt nhất duy nhất; mỗi loại đánh đổi tốc độ, kết hợp, kết nối và khả năng mở rộng theo cách khác nhau." },
            { en: "Trapped ions are strictly superior because their coherence is longer.", vi: "Ion bẫy vượt trội tuyệt đối vì kết hợp lâu hơn." },
            { en: "Superconducting qubits are strictly superior because their gates are faster.", vi: "Qubit siêu dẫn vượt trội tuyệt đối vì cổng nhanh hơn." },
            { en: "Coherence time and gate speed are the same physical quantity.", vi: "Thời gian kết hợp và tốc độ cổng là cùng một đại lượng vật lý." }
          ],
          answer: 0,
          explain: {
            en: "What matters is roughly how many gates fit inside a coherence window, plus connectivity, readout, and how easily the system scales. Fast gates with short coherence and slow gates with long coherence can land in a similar place, so the platforms compete on the whole package, not one number.",
            vi: "Điều quan trọng đại khái là bao nhiêu cổng lọt vào trong cửa sổ kết hợp, cộng với kết nối, đọc kết quả và mức dễ mở rộng. Cổng nhanh mà kết hợp ngắn và cổng chậm mà kết hợp dài có thể ra kết quả tương tự nhau, nên các nền tảng cạnh tranh trên tổng thể, không phải một con số."
          }
        },
        {
          q: {
            en: "In a superconducting transmon, what physically encodes |0⟩ and |1⟩?",
            vi: "Trong một transmon siêu dẫn, cái gì mã hoá vật lý cho |0⟩ và |1⟩?"
          },
          options: [
            { en: "The lowest two energy levels of a superconducting circuit (an anharmonic LC oscillator).", vi: "Hai mức năng lượng thấp nhất của một mạch siêu dẫn (một dao động LC phi điều hoà)." },
            { en: "The spin of a single free electron in vacuum.", vi: "Spin của một electron tự do trong chân không." },
            { en: "The polarization of a single photon.", vi: "Sự phân cực của một photon đơn." },
            { en: "The presence or absence of a trapped ion.", vi: "Sự có mặt hay vắng mặt của một ion bẫy." }
          ],
          answer: 0,
          explain: {
            en: "A transmon is a tiny superconducting circuit whose energy levels are unevenly spaced (anharmonic), so the bottom two levels can be addressed as |0⟩ and |1⟩ without accidentally exciting higher ones. Polarization is photonics; ion internal states are trapped ions; those are different modalities.",
            vi: "Transmon là một mạch siêu dẫn nhỏ có các mức năng lượng cách nhau không đều (phi điều hoà), nên hai mức đáy được dùng làm |0⟩ và |1⟩ mà không vô tình kích lên mức cao hơn. Phân cực là photonics; trạng thái nội của ion là ion bẫy; đó là các nền tảng khác."
          }
        }
      ]
    },
    {
      id: "l2-decoherence",
      minutes: 12,
      title: { en: "Noise and decoherence", vi: "Nhiễu và mất kết hợp" },
      quiz: [
        {
          q: {
            en: "What is the essential difference between T1 and T2?",
            vi: "Khác biệt cốt lõi giữa T1 và T2 là gì?"
          },
          options: [
            { en: "T1 is energy relaxation (|1⟩ decaying toward |0⟩); T2 is dephasing (loss of the relative phase in a superposition).", vi: "T1 là hồi phục năng lượng (|1⟩ suy về |0⟩); T2 là mất pha (mất pha tương đối trong chồng chập)." },
            { en: "T1 is dephasing and T2 is energy relaxation.", vi: "T1 là mất pha và T2 là hồi phục năng lượng." },
            { en: "They are two names for the same time constant.", vi: "Chúng là hai tên gọi của cùng một hằng số thời gian." },
            { en: "T1 applies to ions and T2 applies to superconducting qubits.", vi: "T1 dành cho ion còn T2 dành cho qubit siêu dẫn." }
          ],
          answer: 0,
          explain: {
            en: "T1 measures how fast an excited qubit leaks energy and relaxes toward |0⟩. T2 measures how fast the delicate relative phase between |0⟩ and |1⟩ scrambles. Dephasing is usually the faster killer, and it destroys exactly the phase that interference depends on. In general T2 ≤ 2·T1.",
            vi: "T1 đo qubit bị kích rò năng lượng và hồi phục về |0⟩ nhanh thế nào. T2 đo pha tương đối mong manh giữa |0⟩ và |1⟩ bị xáo trộn nhanh thế nào. Mất pha thường là thứ giết nhanh hơn, và nó phá đúng cái pha mà giao thoa dựa vào. Nói chung T2 ≤ 2·T1."
          }
        },
        {
          q: {
            en: "Why is decoherence so damaging specifically to quantum computation?",
            vi: "Vì sao mất kết hợp gây hại đặc biệt cho tính toán lượng tử?"
          },
          options: [
            { en: "It erases the phase relationships between amplitudes, and interference (the source of quantum advantage) needs those phases.", vi: "Nó xoá các quan hệ pha giữa các biên độ, mà giao thoa (nguồn của lợi thế lượng tử) cần những pha đó." },
            { en: "It makes the qubit heavier, slowing the processor.", vi: "Nó làm qubit nặng hơn, khiến bộ xử lý chậm lại." },
            { en: "It only changes classical bits, not quantum states.", vi: "Nó chỉ đổi bit cổ điển, không đổi trạng thái lượng tử." },
            { en: "It has no effect until the final measurement.", vi: "Nó không ảnh hưởng gì cho tới phép đo cuối." }
          ],
          answer: 0,
          explain: {
            en: "A quantum algorithm steers amplitudes so that wrong answers cancel and right answers add. That cancellation needs well-defined relative phases. Decoherence randomizes those phases, so the interference washes out and the machine degrades toward a noisy classical device.",
            vi: "Một thuật toán lượng tử điều khiển biên độ sao cho đáp án sai triệt tiêu và đáp án đúng cộng dồn. Sự triệt tiêu đó cần pha tương đối rõ ràng. Mất kết hợp làm ngẫu nhiên hoá các pha đó, nên giao thoa nhoè đi và cỗ máy thoái hoá thành một thiết bị cổ điển đầy nhiễu."
          }
        }
      ]
    },
    {
      id: "l3-error-correction",
      minutes: 14,
      title: { en: "Quantum error correction and the surface code", vi: "Sửa lỗi lượng tử và mã bề mặt" },
      quiz: [
        {
          q: {
            en: "Why can't quantum error correction just copy a qubit three times and take a majority vote, the way a classical repetition code does?",
            vi: "Vì sao sửa lỗi lượng tử không thể chỉ sao qubit ra ba bản rồi lấy đa số, như mã lặp cổ điển?"
          },
          options: [
            { en: "The no-cloning theorem forbids copying an unknown quantum state, so QEC must spread information across entangled qubits instead.", vi: "Định lý không sao chép cấm sao một trạng thái lượng tử chưa biết, nên sửa lỗi phải trải thông tin qua các qubit rối thay vì sao." },
            { en: "Copying works fine; QEC is unnecessary.", vi: "Sao chép vẫn ổn; sửa lỗi là không cần thiết." },
            { en: "Qubits are too cheap to bother copying.", vi: "Qubit quá rẻ nên chẳng cần sao." },
            { en: "Majority voting is illegal in quantum mechanics for energy reasons.", vi: "Bỏ phiếu đa số bị cấm trong cơ học lượng tử vì lý do năng lượng." }
          ],
          answer: 0,
          explain: {
            en: "No-cloning means you cannot make independent copies of an unknown state to vote on. QEC gets around this by encoding one logical qubit into an entangled block of many physical qubits, so information is delocalized rather than duplicated.",
            vi: "Không sao chép nghĩa là bạn không thể tạo các bản độc lập của một trạng thái chưa biết để bỏ phiếu. Sửa lỗi lách qua điều này bằng cách mã hoá một qubit logic vào một khối rối gồm nhiều qubit vật lý, nên thông tin bị trải rộng chứ không nhân đôi."
          }
        },
        {
          q: {
            en: "A syndrome (stabilizer) measurement in the surface code is special because...",
            vi: "Phép đo hội chứng (stabilizer) trong mã bề mặt đặc biệt vì..."
          },
          options: [
            { en: "...it reveals whether an error occurred, and roughly where, without measuring (and thus collapsing) the encoded logical data itself.", vi: "...nó cho biết có lỗi xảy ra không, và đại khái ở đâu, mà không đo (nên không làm sập) chính dữ liệu logic được mã hoá." },
            { en: "...it reads out the full logical state and then rewrites it.", vi: "...nó đọc toàn bộ trạng thái logic rồi ghi lại." },
            { en: "...it copies the logical qubit before checking it.", vi: "...nó sao qubit logic trước khi kiểm tra." },
            { en: "...it works only if no error ever occurs.", vi: "...nó chỉ hoạt động nếu không bao giờ có lỗi." }
          ],
          answer: 0,
          explain: {
            en: "Stabilizer measurements are designed to reveal a parity-check 'syndrome' - a signature of errors - while commuting with the logical information, so they never reveal the encoded value. A classical decoder reads the syndromes and infers a correction, all without collapsing the data.",
            vi: "Phép đo stabilizer được thiết kế để lộ ra một 'hội chứng' kiểm tra chẵn lẻ - dấu vết của lỗi - trong khi giao hoán với thông tin logic, nên không bao giờ để lộ giá trị được mã hoá. Một bộ giải mã cổ điển đọc các hội chứng và suy ra cách sửa, tất cả mà không làm sập dữ liệu."
          }
        }
      ]
    },
    {
      id: "l4-nisq",
      minutes: 13,
      title: { en: "The NISQ era: VQE and QAOA", vi: "Kỷ nguyên NISQ: VQE và QAOA" },
      quiz: [
        {
          q: {
            en: "What does NISQ stand for, and who coined it?",
            vi: "NISQ viết tắt của gì, và ai đặt ra thuật ngữ này?"
          },
          options: [
            { en: "Noisy Intermediate-Scale Quantum, coined by John Preskill (2018).", vi: "Noisy Intermediate-Scale Quantum (Lượng tử quy mô trung bình có nhiễu), do John Preskill đặt (2018)." },
            { en: "Networked Ion Silicon Qubits, coined by IBM.", vi: "Networked Ion Silicon Qubits, do IBM đặt." },
            { en: "Non-Interfering Stable Quantum, coined by Feynman.", vi: "Non-Interfering Stable Quantum, do Feynman đặt." },
            { en: "New Integrated Superconducting Qubits, coined by Google.", vi: "New Integrated Superconducting Qubits, do Google đặt." }
          ],
          answer: 0,
          explain: {
            en: "Preskill introduced 'Noisy Intermediate-Scale Quantum' in 2018 to name the current era: devices with roughly 50-1000 qubits, too noisy for full error correction but big enough to be interesting. The word 'noisy' is right in the name - it is a description, not a marketing label.",
            vi: "Preskill đưa ra 'Noisy Intermediate-Scale Quantum' năm 2018 để gọi tên kỷ nguyên hiện tại: thiết bị cỡ 50-1000 qubit, quá nhiều nhiễu để sửa lỗi đầy đủ nhưng đủ lớn để thú vị. Chữ 'noisy' (có nhiễu) nằm ngay trong tên - đó là một mô tả, không phải nhãn quảng cáo."
          }
        },
        {
          q: {
            en: "In a variational algorithm like VQE or QAOA, how is the work split?",
            vi: "Trong một thuật toán biến phân như VQE hay QAOA, công việc được chia thế nào?"
          },
          options: [
            { en: "The quantum computer prepares and measures a parameterized state; a classical optimizer adjusts the parameters in a loop.", vi: "Máy lượng tử chuẩn bị và đo một trạng thái có tham số; một bộ tối ưu cổ điển điều chỉnh tham số trong một vòng lặp." },
            { en: "The quantum computer does everything; the classical computer is idle.", vi: "Máy lượng tử làm hết; máy cổ điển ngồi không." },
            { en: "The classical computer solves the whole problem and the quantum chip just displays it.", vi: "Máy cổ điển giải toàn bộ bài toán còn chip lượng tử chỉ hiển thị." },
            { en: "Both run the identical algorithm and compare answers.", vi: "Cả hai chạy cùng một thuật toán rồi so kết quả." }
          ],
          answer: 0,
          explain: {
            en: "Variational methods are hybrid. Short quantum circuits (which stay inside the coherence budget) estimate a cost - for VQE, an energy; for QAOA, an objective. A classical optimizer then nudges the circuit's parameters and asks the quantum computer again, iterating toward a minimum.",
            vi: "Phương pháp biến phân là lai. Các mạch lượng tử ngắn (nằm trong ngân sách kết hợp) ước lượng một chi phí - với VQE là năng lượng; với QAOA là một hàm mục tiêu. Bộ tối ưu cổ điển sau đó chỉnh tham số của mạch và hỏi lại máy lượng tử, lặp dần tới cực tiểu."
          }
        }
      ]
    },
    {
      id: "l5-fault-tolerance",
      minutes: 13,
      title: { en: "The road to fault tolerance", vi: "Con đường tới chịu lỗi" },
      quiz: [
        {
          q: {
            en: "What does the threshold theorem promise?",
            vi: "Định lý ngưỡng hứa hẹn điều gì?"
          },
          options: [
            { en: "If the physical error rate per gate is below a fixed threshold, arbitrarily long reliable computation is possible by scaling error correction.", vi: "Nếu tỷ lệ lỗi vật lý trên mỗi cổng dưới một ngưỡng cố định, ta có thể tính toán tin cậy dài tuỳ ý bằng cách mở rộng sửa lỗi." },
            { en: "Quantum computers will never make errors.", vi: "Máy lượng tử sẽ không bao giờ mắc lỗi." },
            { en: "Any error rate at all is fine as long as you have enough qubits.", vi: "Tỷ lệ lỗi bao nhiêu cũng được miễn có đủ qubit." },
            { en: "Error correction is impossible in principle.", vi: "Sửa lỗi về nguyên tắc là bất khả." }
          ],
          answer: 0,
          explain: {
            en: "The threshold theorem says there is a critical physical error rate. Below it, adding more physical qubits per logical qubit drives the logical error rate down as far as you like, enabling arbitrarily long computations. Above it, adding qubits makes things worse. The whole engineering race is about getting - and staying - below threshold.",
            vi: "Định lý ngưỡng nói có một tỷ lệ lỗi vật lý tới hạn. Dưới nó, thêm nhiều qubit vật lý cho mỗi qubit logic sẽ kéo tỷ lệ lỗi logic xuống thấp tuỳ ý, cho phép tính toán dài tuỳ ý. Trên nó, thêm qubit lại tệ hơn. Cả cuộc đua kỹ thuật là để đạt - và giữ - dưới ngưỡng."
          }
        },
        {
          q: {
            en: "Which statement about the gap between NISQ and fault-tolerant machines is most honest?",
            vi: "Phát biểu nào về khoảng cách giữa NISQ và máy chịu lỗi là trung thực nhất?"
          },
          options: [
            { en: "Fault tolerance needs many physical qubits per logical qubit and below-threshold error rates; it is a serious, ongoing engineering challenge, not a solved problem.", vi: "Chịu lỗi cần rất nhiều qubit vật lý cho mỗi qubit logic và tỷ lệ lỗi dưới ngưỡng; đó là một thách thức kỹ thuật nghiêm túc, đang tiếp diễn, chưa được giải xong." },
            { en: "Fault-tolerant machines already run useful commercial workloads at scale.", vi: "Máy chịu lỗi đã chạy các tác vụ thương mại hữu ích ở quy mô lớn." },
            { en: "NISQ machines are already fault-tolerant.", vi: "Máy NISQ vốn đã chịu lỗi." },
            { en: "No progress toward fault tolerance has ever been demonstrated.", vi: "Chưa từng có tiến bộ nào về chịu lỗi được chứng minh." }
          ],
          answer: 0,
          explain: {
            en: "Recent experiments have shown a single logical qubit beating its best physical qubit and error rates dropping as codes grow - real, encouraging milestones. But a large fault-tolerant computer needs many high-quality logical qubits, each built from many physical qubits, sustained below threshold. That remains hard and unfinished, and honest sources avoid promising firm timelines.",
            vi: "Các thí nghiệm gần đây đã cho thấy một qubit logic thắng qubit vật lý tốt nhất của nó và tỷ lệ lỗi giảm khi mã lớn lên - những cột mốc thật, đáng khích lệ. Nhưng một máy chịu lỗi lớn cần nhiều qubit logic chất lượng cao, mỗi cái dựng từ nhiều qubit vật lý, giữ được dưới ngưỡng. Điều đó vẫn khó và chưa xong, và các nguồn trung thực tránh hứa mốc thời gian chắc chắn."
          }
        }
      ]
    }
  ]
});
